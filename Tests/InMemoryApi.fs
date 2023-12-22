[<AutoOpen>]
module InMemoryApi

open System.Net.Http
open System.Net.Http.Headers
open System.Text
open Microsoft.AspNetCore.Mvc.Testing
open Newtonsoft.Json
open Program
open FsToolkit.ErrorHandling

let run () =
    (new WebApplicationFactory<Program>()).Server

type HttpClient with
    member this.Put (path: string) (payload: obj) =
        let json = JsonConvert.SerializeObject payload
        use content = new StringContent(json, Encoding.UTF8, "application/json")
        this.PutAsync(path, content) |> Async.AwaitTask

    member this.Post (path: string) (payload: obj) =
        let json = JsonConvert.SerializeObject payload
        use content = new StringContent(json, Encoding.UTF8, "application/json")
        this.PostAsync(path, content) |> Async.AwaitTask

    member this.Delete(path: string) =
        this.DeleteAsync path
        |> Async.AwaitTask
        |> Async.bind (fun resp ->
            resp.Content.ReadAsStringAsync()
            |> Async.AwaitTask
            |> Async.map JsonConvert.DeserializeObject<'a>)
        
    member this.Options<'a>(path: string) =
        new HttpRequestMessage(HttpMethod.Options, path)
        |> this.SendAsync
        |> Async.AwaitTask
        |> Async.bind (fun resp ->
            resp.Content.ReadAsStringAsync()
            |> Async.AwaitTask
            |> Async.map JsonConvert.DeserializeObject<'a>)

    member this.Get<'a>(path: string) (authHeader: AuthenticationHeaderValue option) =
        if authHeader.IsSome then
            this.DefaultRequestHeaders.Authorization <- authHeader.Value
        this.GetAsync(path)
        |> Async.AwaitTask
        |> Async.bind (fun resp ->
            resp.Content.ReadAsStringAsync()
            |> Async.AwaitTask
            |> Async.map JsonConvert.DeserializeObject<'a>)

    member this.GetString(path: string) =
        this.GetStringAsync(path) |> Async.AwaitTask
