module Home

open Fable.Core
open Fetch.Types
open Sutil

let readOptionsMock (): JS.Promise<{|href: string; ref: string|} list> =
    promise {
        return [|{|href="/accommodation"; ref=""|}|] |> Array.toList
    }

let readOptions (): JS.Promise<{|href: string; ref: string|} list> =
    promise {
        let url = $"{Settings.ApiBaseUrl}/accommodation"
        let! response = Fetch.fetch url [RequestProperties.Method HttpMethod.OPTIONS]
        let! options = response.json<{|href: string; ref: string|}[]>()
        return options |> Array.toList
    }
    
//let options = readOptions() |> Store.make

let link href =
    Html.a [
    Html.text "Show Houses"
    Attr.href href
    //onClick (fun _ -> ()) [PreventDefault] 
]
    
let view (readOptions: unit -> JS.Promise<{| href: string; ref: string |} list>) =
    Html.div [
        Bind.promise(readOptions(),
                      (fun options -> link options[0].href),
                      (text "waiting..."),
                      fun err -> text "Error")
    ]
    
// let getBookById3 (id: int): JS.Promise<{|name: string; capacity: int|}> =
//     promise {
//         let url = $"{Settings.ApiBaseUrl}/accommodation/houses/Gryffindor"
//         let! asd = Fetch.get<_, {|name: string; capacity: int|}> url 
//         return asd
//     } 