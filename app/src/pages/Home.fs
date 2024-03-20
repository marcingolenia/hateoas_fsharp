module Home

open Fable.Core
open Fetch.Types
open Thoth.Json
open Sutil

let readOptionsMock (): JS.Promise<Link list> =
    promise {
        return [{Href="/accommodation"; Rel=""}]
    }

let readOptions (): JS.Promise<Link list> =
    promise {
        let url = $"{Settings.ApiBaseUrl}/accommodation"
        //let! response = Fetch.fetch url [RequestProperties.Method HttpMethod.OPTIONS]
        let! res = Thoth.Fetch.Fetch.fetchAs<_, Link[]>(url, caseStrategy = CamelCase, httpMethod = HttpMethod.OPTIONS)
        //let! options = response.json<{|href: string; ref: string|}[]>()
        return res |> Array.toList
    }
    
//let options = readOptions() |> Store.make

let renderShowHouses link =
    Html.a [
    Html.text "Show Houses"
    Attr.href link.Href
    //onClick (fun _ -> ()) [PreventDefault] 
]
    
let view (readOptions: unit -> JS.Promise<Link list>) =
    Html.div [
        Bind.promise(readOptions(),
                      (fun options -> renderShowHouses (options |> List.find(fun link -> link.Rel = "all_houses"))),
                      (text "waiting..."),
                      fun err -> text "Error")
    ]
    
// let getBookById3 (id: int): JS.Promise<{|name: string; capacity: int|}> =
//     promise {
//         let url = $"{Settings.ApiBaseUrl}/accommodation/houses/Gryffindor"
//         let! asd = Fetch.get<_, {|name: string; capacity: int|}> url 
//         return asd
//     } 