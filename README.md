# HATEOAS in F#
Hypermedia as the engine of application state (HATEOAS) is 24 years old now! 
I am coding for more than 12 years and yet I didn't see it on production in projects I worked with. 
Why? Is it so bad? Complex?

## 1. The problem 
Let's say that You are an software engineer and You are supposed to create a house allocation app for
Hogwarts. 
1. List houses
2. List house students
3. Delete student (only admin can delete student)
4. Onboard student (only admin can onboard student)
5. The API should be accessible after "/accommodation" url part. 
6. The API should be RESTful

Let's create quickly some models 
```fsharp
type HouseName =
    | Gryffindor
    | Hufflepuff
    | Ravenclaw
    | Slytherin

type House = { Name: HouseName; Capacity: int }

type Student =
    { Id: string
      Name: string
      House: HouseName }

let Gryffindor = { Name = Gryffindor; Capacity = 190 }
let Slytherin = { Name = Slytherin; Capacity = 200 }
let Ravenclaw = { Name = Ravenclaw; Capacity = 200 }
let Hufflepuff = { Name = Hufflepuff; Capacity = 250 }
```
and some DTOs
```fsharp
module HouseAllocation.Dtos

open HouseAllocation.Domain

type HouseDto =
    { Name: string
      Capacity: int }

    static member map(house: House) =
        { Name = house.Name.ToString()
          Capacity = house.Capacity }

type StudentDto =
    { Id: string
      Name: string
      House: string }

    static member map (student: Student) =
        { Id = student.Id
          Name = student.Name
          House = student.House.ToString() }
```
and some simple in-memory data access: 
```fsharp
module HouseAllocation.Dao

open Domain
open System

let f = Bogus.Faker()

let houses: House list = [ Gryffindor; Slytherin; Ravenclaw; Hufflepuff ]

let private generateStudents house =
    [ for _ in 1..100 ->
          { Id = Guid.NewGuid().ToString()
            Name = f.Name.FullName()
            House = house } ]

let private allStudents =
    [ for house in
          [ HouseName.Gryffindor
            HouseName.Slytherin
            HouseName.Ravenclaw
            HouseName.Hufflepuff ] do
          yield! generateStudents house ]
    
let mutable housedStudents =
    allStudents |> List.groupBy _.House
                |> Map.ofList
    
let deleteStudentBy (id: string) =
    housedStudents <- housedStudents.Values
                            |> List.concat
                            |> List.filter(fun student -> student.Id <> id)
                            |> List.groupBy _.House
                            |> Map.ofList
                      
```
Simple stuff. Let's add endpoints! (I am using endpoints routing from Giraffe) 
```fsharp
module HouseAllocation.Router

open Giraffe
open Giraffe.EndpointRouting
open Microsoft.AspNetCore.Http
open Microsoft.FSharp.Reflection
open Domain
open Dao
open Dtos

let fromString<'a> (s: string) =
    match FSharpType.GetUnionCases typeof<'a> |> Array.filter (fun case -> case.Name = s) with
    | [| case |] -> Some(FSharpValue.MakeUnion(case, [||]) :?> 'a)
    | _ -> None

let readHouses: HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        let data =
            houses
            |> List.map (fun house -> house.Name.ToString())
        json data next ctx

let readHouseBy (name: string) : HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        let house =
            houses
            |> List.tryFind (fun house -> house.Name.ToString() = name)
            |> Option.bind (fun house -> HouseDto.map house |> Some)
        match house with
        | Some house -> json house next ctx
        | None ->
            ctx.SetStatusCode(StatusCodes.Status404NotFound)
            text "Page not found" next ctx

let readStudentsBy (houseName: string) : HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        let house = fromString<HouseName> houseName
        match house with
        | Some house -> housedStudents[house] |> fun list ->
            let response: ResponseDto<StudentDto list> = { Members = list |> List.map(StudentDto.map) }
            json response next ctx
        | None ->
            ctx.SetStatusCode(StatusCodes.Status404NotFound)
            text "Page not found" next ctx

let deleteStudentBy (house: string, id: string) : HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        deleteStudentBy id
        text "ok" next ctx

let endpoints =
    [
      GET [
            routef "/houses/%s/students" readStudentsBy
            routef "/houses/%s" readHouseBy
            route "/houses" readHouses
          ]
      DELETE [
          routef "/houses/%s/students/%s" deleteStudentBy
      ]
    ]
```
But wait... I've done all the code in the problem part... Why? Because we can still do better. Let me ask You...
1. How someone may now that the `/houses` endpoint does exist? How can we make sure that our API is discoverable? 
2. How can the consumer of the API know what is possible?

This two questions are related, I just wanted to emphasize the importance of it. If the API consumer doesn't
know the answers to this questions the only thing to do is to learn about it from the docs (like swagger), implement some 
logic on the frontend and pray that no one will do a breaking change. 
## 2. The solution 
Swagger? Yes, that's it. The blog post is over... :D Swagger provides a documentation of all endpoints, 
we can generate clients from OpenApi spec, but does it make our API discoverable? Let me bring my point of view here on 
discoverable vs documented:
> Documented means written down, cataloged and explained. First we need to read the documentation and then make a 
> decision. Discoverability is about taking the first step and seeing what we can do next. So we can make 
> the next decision as we go. In short: 
> - Documented: Formalized information 
> - Discoverable: Exploratory learning

The two serve different purposes and are not mutually exclusive. You can have one without the other, and You can have both.

### 2.1 Without HATEOAS
So let's talk about 
> only admin can delete student
> 
When such requirements take place we can easily implement it on the backend right? Let's say we have a popular JWT auth
mechanism in place. We check if users has a particular role and if not we say 401. 

On the frontend part we then end up with something like this (this is actual code from my current job)

```tsx
const { checkPermissions } = usePermissionHandler();
...
<Stack>
    {checkPermissions("general", "write") && (
            <form onSubmit={handleSubmit(saveNote)}>
             ...
    }
```
Now... this is the problem HATEOAS addresses. We duplicate the code because we don't know what and when 
is possible with the API. So we fetch roles/permissions and we check them on FE so we can display more/less
buttons and then we do validate the actions on BE. HATEOAS is about making the workflow explicit by leveraging
hypermedia, so the API consumers don't have to reproduce the logic on their side. 

### 2.2 With HATEOAS
We will focus now on discoverability. A common practice to inform API clients what's possible is to
implement `OPTIONS` to return the list of supported actions [1]. 
Let's add them! 
```fsharp
let endpoints =
    [
      OPTIONS [
          route "/" readOptions
      ]
//... remaining endpoints.
```
and handler:
```fsharp
let readOptions: HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        let links : Link list = [{
                Rel = "all_houses"
                Href = "/accommodation/houses"
        }]
        json links next ctx
```
the Link Dto: 
```fsharp
type Link = {
    Rel: string
    Href: string
}
```
What's Rel what's Href? 
1. Href attribute specifies the URL of the resource the link goes to.
2. Rel indicates the relationship of the target resource to the current one.

// The fundamental idea of hypermedia is to enrich the representation of a resource with hypermedia elements.

# References
[1] RESTful Web Services Cookbook, Subbu Allamaraju, O'Reilly 2010. Chapter 14, Enabling Discovery.
https://docs.spring.io/spring-hateoas/docs/current/reference/html/
https://www.youtube.com/watch?v=bHc8Gudrhdo
https://www.iana.org/assignments/link-relations/link-relations.xhtml