module HouseAllocation.Views

open Giraffe.ViewEngine

let card name imgSrc =
    div
        [ _class "card w-96 bg-base-100 shadow-xl" ]
        [ figure [] [ img [ _src imgSrc ] ]
          div
              [ _class "card-body" ]
              [ h2 [ _class "card-title" ] [ str name ]
                p [] [ str "If a dog lala" ]
                div [ _class "card-actions justify-end" ] [ button [ _class "btn btn-primary" ] [ str "Accomodate" ] ] ] ]

let layout =
    html
        [ attr "data-theme" "dracula" ]
        [ head
              []
              [ title [] [ str "Hogwarts accommodation" ]
                link
                    [ _href "https://cdn.jsdelivr.net/npm/daisyui@4.7.1/dist/full.min.css"
                      _rel "stylesheet"
                      _type "text/css" ]
                script [ _src "https://cdn.tailwindcss.com" ] []
                script
                    [ _src "https://unpkg.com/htmx.org@1.9.10"
                      _integrity "sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
                      _crossorigin "anonymous" ]
                    [] ]
          body
              []
              [
                div [ _class "flex items-center justify-center m-4" ] [
                    table
                        [ _class "table table-zebra w-fit" ]
                        [ thead [] [ tr [] [ th [] [ str "House" ]; th [] [ str "Occupied" ]; th [] [ str "Capacity" ] ] ]
                          tbody [] [
                              tr [] [ td [] [ str "Gryffindor" ]; td [] [ str "120" ]; td [] [ str "200" ] ]
                              tr [] [ td [] [ str "Slytherin" ]; td [] [ str "120" ]; td [] [ str "200" ] ]
                              tr [] [ td [] [ str "Hufflepuff" ]; td [] [ str "120" ]; td [] [ str "200" ] ]
                              tr [] [ td [] [ str "Ravenclaw" ]; td [] [ str "120" ]; td [] [ str "200" ] ]
                          ]
                        ]
                    div [ _style "max-width:250px;" ] [
                        img [_src "/images/tiara.png" ]
                    ]
                ]
              
                div
                    [ _id "TestContainer" ]
                    []
                div [ _class "flex space-x-8 flex-wrap items-center justify-center" ]
                    [ card "Gryffindor" "/images/gryffindor.gif"
                      card "Slytherin" "/images/slytherin.gif"
                      card "Hufflepuff" "/images/hufflepuff.gif"
                      card "Ravenclaw" "/images/ravenclaw.gif" ]

                ] ]
// let index (houses: House list)=
//     html [] [
//         head [] [
//             title [] [ str "Giraffe Sample" ]
//             button [_hxGet "/accommodation/houses/test"; _hxTarget "#TestContainer"] [str "Click me"]
//         ]
//         body [] [
//             h1 [] [ str "I |> F#" ]
//             div [_id "TestContainer"] []
//             p [ _class "some-css-class"; _id "someId" ] [
//                 str "Hello World"
//             ]
//         ]
//         script [_src "https://unpkg.com/htmx.org@1.9.10"; _integrity "sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"; _crossorigin "anonymous" ] []
//     ]


let test = div [] [ h2 [] [ str "Huj" ] ]
