module Home

open Vide
open type Html
open Fable.Core
open Thoth.Fetch

type Book = {
    Name: string
}

let handleError (err: FetchError) = 
    match err with 
        | FetchFailed err -> err.StatusText
        | DecodingFailed _ -> "err"
        | PreparingRequestFailed(_) -> "Not Implemented"
        | NetworkError(_) -> "Not Implemented"

let getBookById2 (id: int): JS.Promise<{|name: string; capacity: int|}> =
    promise {
        Browser.Dom.console.log(id)
        let url = $"{Settings.ApiBaseUrl}/accommodation/houses/Gryffindor"
        let! asd = Fetch.tryGet<_, {|name: string; capacity: int|}> url
        return match asd with 
                | Error err -> Browser.Dom.console.log(handleError(err)); {|name= ""; capacity=2|}
                | Ok ddd -> ddd
    } 

let getBookById3 (id: int): JS.Promise<{|name: string; capacity: int|}> =
    promise {
        let url = $"{Settings.ApiBaseUrl}/accommodation/houses/Gryffindor"
        let! asd = Fetch.get<_, {|name: string; capacity: int|}> url 
        return asd
    } 

let getBookById (id : int) : JS.Promise<string> =
    promise {
        let url = $"{Settings.ApiBaseUrl}/health"
        let! asd = Fetch.fetch url [] 
        //Browser.Dom.console.log(asd)

        return! asd.text()
    } 

let render (count) =
    vide {
        p {
            $"{count} loading 1sst number ..."
            let! res1 = async {
                let! b = getBookById2(count) |> Async.AwaitPromise
                let! b3 = getBookById3(5) |> Async.AwaitPromise
                let! a = getBookById(5) |> Async.AwaitPromise
                // Browser.Dom.console.log(b)
                Browser.Dom.console.log(a)
                Browser.Dom.console.log(b3)
                return 42
            }
            $"{res1}"
        }
        div {
            h1.class'("text-3xl font-bold underline text-center") { "Home" }
        }
    }