
# HATEOAS in F#

> This post is part of the F# Advent Calendar 2023. Special thanks to Sergey Tihon for organizing this! [Check out all the other great posts there!](https://sergeytihon.com/2023/10/28/f-advent-calendar-in-english-2023/)

## 1. What is HATEOAS? 
You will have to read the whole post to get sense of it. The extra short definition of mine would be:
Hypermedia as the engine of application state (HATEOAS) is the most mature form of a RESTful API:
![Screenshot](glory.png)

It's about including links to resources to make it clear what is possible and what's not. 

Sounds boring? Maybe, but it can save You from writing a lot of code and remove some coupling if you are ready 
for some additional complexity.

I will divide the topic into 3 parts:
1. HATEOAS in F# (this post)
2. Let's try LinkGenerator to see if it can simplify HATEOAS implementation (coming soon)
3. Consuming RESTful API and leveraging HATEOAS in F# Fable app (coming soon)

Hypermedia as the engine of application state (HATEOAS) is 24 years old now! 
I am coding for more than 12 years and yet I didn't see it on production in projects I worked with. 
Why? Is it so bad? Complex?

## 2. The problem 
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
## 3. The solution 
Swagger? Yes, that's it. The blog post is over... :D Swagger provides a documentation of all endpoints, 
we can generate clients from OpenApi spec, but does it make our API discoverable? Let me bring my point of view here on 
discoverable vs documented:
> Documented means written down, cataloged and explained. First we need to read the documentation and then make a 
> decision. Discoverability is about taking the first step and seeing what we can do next. So we can make 
> the next decision as we go. In short: 
> - Documented: Formalized information 
> - Discoverable: Exploratory learning

The two serve different purposes and are not mutually exclusive. You can have one without the other, and You can have both.

### 3.1 Without HATEOAS
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

### 3.2 With HATEOAS
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
What's Link ... and Rel and what's Href? 
The fundamental idea of hypermedia is to enrich the representation of a resource with hypermedia elements. The most 
common form hypermedia is a "link". 
1. Href attribute specifies the URL of the resource the link goes to.
2. Rel indicates the relationship of the target resource to the current one. There are some predefined in the wild [2],
but You are not limited to them. You can come up with Your own. Just be sure that they are meaningful and consistent.
Seeing this in API may seem something new... but You know Links, don't You?
```html
<head>  
   <link rel="stylesheet" href="mystyle.css">
</head>
```
What kind of response we will get?
```json
[{ 
    Rel = "all_houses"
    Href = "/accommodation/houses" 
}]
```
So there is only one option. So far so good. Now we can discover the endpoint, list the houses... and what? How is this related to 
> only admin can delete student
That was an intermediate step. Now let's add the hypermedia elements to list of houses.

Let's add hypermedia to the `/accommodation/houses` endpoint. What do You think the response should include? Everything
what's possible. So list of houses and related links; 
```json
[
   {
      "name":"Gryffindor",
      "links":[
         {
            "rel":"self",
            "href":"/accommodation/houses/Gryffindor"
         },
         {
            "rel":"all_students",
            "href":"/accommodation/houses/Gryffindor/students"
         }
      ]
   },
   {
      "name":"Slytherin",
      "links":[
         {
            "rel":"self",
            "href":"/accommodation/houses/Slytherin"
         },
         {
            "rel":"all_students",
            "href":"/accommodation/houses/Slytherin/students"
         }
      ]
   },
   {
      "name":"Ravenclaw",
     ...
   },
   {
     "name": "Hufflepuff",
     ...
   }
]
```
Discoverable? I hope so. How to make this response happen? 
```fsharp
let readHouses: HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        let data =
            houses
            |> List.map (fun house ->
                { Name = house.Name.ToString()
                  Links =
                    [ { Rel = "self"
                        Href = $"/accommodation/houses/{house.Name.ToString()}" }
                      { Rel = "all_students"
                        Href = $"/accommodation/houses/{house.Name.ToString()}/students" }
                    ] })

        json data next ctx
```
This requires some extra work, but it gives You a lot of freedom. You can change endpoints, without breaking 
consumer as long as they use links instead hardcoded URLs. Is it Discoverable? I hope so. Let's hit the href 
`"/accommodation/houses/Slytherin/students"` now. What would You expect? Now here is the power of HATEOAS. You can expect
a student without hypermedia or with it - depending on who ask. Admin? Yes, there is a "edit" link. Not and admin? So no
link for that.
Not an admin:
```fsharp
{
   "members":[
      {
         "id":"b22344a2-51cd-40b6-b1a2-377cf83d3fa1",
         "name":"Elmer Goodwin",
         "house":"Gryffindor",
         "links":[  
         ]
      }
      ....
```
Now imagine that admin requested the resource:
```fsharp
{
   "members":[
      {
         "id":"bb2409fe-633d-42f8-b3fa-60a94e1744fb",
         "name":"Oda Kub",
         "house":"Gryffindor",
         "links":[
            {
               "rel":"edit",
               "href":"/accommodation/houses/Gryffindor/students/bb2409fe-633d-42f8-b3fa-60a94e1744fb"
            }
         ]
      },
      ...
```
Can You feel the power now? Not yet? Why? FE can now rely only on the presence/absence of links. Your api
can now drive the workflows, not duplicated logic on FE side in the form of providers, if-statements or whatever. FE now
can be free of roles, permissions, business logic rules duplication.

Note that I've used IANA "edit" role. There is nothing wrong in adding extra "delete" or "archive" rel type. 
From my experience I can tell that if someone can edit, it can most probably also delete. If not feel free to add the 
rel type I've mentioned. Just be consistent. How to make this responses happen? 
```fsharp
let readStudentsBy (houseName: string) : HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        let house = fromString<HouseName> houseName
        let isAdmin = ctx.User.IsInRole "Admin"
        match house with
        | Some house -> housedStudents[house] |> fun list ->
            let response: ResponseDto<StudentDto list> = { Members = list |> List.map(StudentDto.map isAdmin)
                                                           Links = [{Rel = "parent"; Href = $"/accommodation/houses/{houseName}" }] 
            }
            json response next ctx
        | None ->
            ctx.SetStatusCode(StatusCodes.Status404NotFound)
            text "Page not found" next ctx
```
Note that this code is for JWT auth. If implemented correctly the jwt middleware from .netcore will add User claims to
http context. For the sake of completion let me paste the `StudentDto.fs` code here: 
```fsharp
type StudentDto =
    { Id: string
      Name: string
      House: string
      Links: Link list }

    static member map (canEdit: bool) (student: Student) =
        let houseName = student.House.ToString()

        { Id = student.Id
          Name = student.Name
          House = houseName
          Links =
            match canEdit with
            | false -> []
            | true ->
                [ { Rel = "edit"
                    Href = $"/accommodation/houses/{houseName}/students/{student.Id}" } ] }
```
### 3.3 Testing HATEOAS
Here is a test which can test HATEOAS:
```fsharp
[<Fact>]
let ``HATEOAS: Admin Can list students, delete one of them and get refreshed list`` () =
    task {
        let api = run().CreateClient()
        let! options = api.Options<Link list>"/accommodation"
        let allHousesLink =  options |> List.find(fun link -> link.Rel = "all_houses") |> _.Href
        let! housesReponse = api.Get<HouseListItemDto list> allHousesLink None
        let fstHouseLink = housesReponse.Head
                           |> _.Links
                           |> List.find(fun link -> link.Rel = "all_students")
                           |> _.Href
        let! studentsReponse = api.Get<ResponseDto<StudentDto list>> fstHouseLink (Some (AuthenticationHeaderValue("Test", "Admin")))
        let fstStudentLink = studentsReponse.Members.Head
                             |> _.Links
                             |> List.find(fun link -> link.Rel = "edit")
                             |> _.Href
        let! _ = api.Delete<ConfirmationDto> fstStudentLink
        let! studentsReponseAfterDelete = api.Get<ResponseDto<StudentDto list>> fstHouseLink None
        let studentThatShouldBeRemoved =
            studentsReponseAfterDelete.Members
            |> List.tryFind(fun student -> student.Name = studentsReponse.Members.Head.Name)
        studentThatShouldBeRemoved |> should equal None
    }
```
I am not using real JWT auth nor a database underneath, but even with real things the test would look like the same. From
this test You can see how You can process links to derive current state, without coding any logic on the API consumer side.

## 4. Homework
> Onboard student (only admin can onboard student)

What about cloning this repo and trying to implement this? I keep my fingers crossed.
## 5. Summary
I hope that by going through an imaginary example You are able to take some conclusions by Your own. Is Your client app 
relying on logic duplication? Do You want to introduce some additional complexity to remove it? Long story short:
### API with HATEOAS:
Pros:
- Discoverability: HATEOAS enables better discoverability of resources and actions by providing links within API responses.
- Flexibility: Clients can dynamically navigate through the API by following links, reducing the need for hardcoded URLs.
- Clients can rely on links and state transitions, simplifying client logic and making it more adaptable to changes.

Cons:
- Complexity: Implementing HATEOAS can add complexity to both server and client implementations.
- Learning Curve: Developers may need time to understand and adapt to the dynamic nature of HATEOAS-driven APIs.
### API without HATEOAS:
Pros:
- Simplicity: APIs without HATEOAS are often simpler to implement and understand.

Cons:
- Hardcoded Logic: Clients rely on hardcoded URLs, making them more brittle to changes in the API structure (so coupling).
- Limited Discoverability: Without HATEOAS, discovering available actions and resources may require external documentation, leading to a potential lack of self-discovery.

These are the key differences I can see.

### 5.1 Where to go from here? 
If what I presented got Your attention then You should definitely check 
"Crafting domain driven web APIs" By Julien Topçu [3] excellent talk. He uses Kotlin and spring on the slides, 
but this shouldn't be a problem. Also spring documentation [4] is an excellent resource where You can find a lot of 
good stuff about HATEOAS even if You are not using spring. 

# References
- [1] RESTful Web Services Cookbook, Subbu Allamaraju, O'Reilly 2010. Chapter 14, Enabling Discovery.
- [2] https://www.iana.org/assignments/link-relations/link-relations.xhtml
- [3] [Crafting domain driven web APIs - By Julien Topçu](https://www.youtube.com/watch?v=bHc8Gudrhdo)
- [4] [Spring Hateoas documentation](https://docs.spring.io/spring-hateoas/docs/current/reference/html/)
