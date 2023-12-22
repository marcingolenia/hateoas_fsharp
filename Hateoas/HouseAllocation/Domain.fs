module HouseAllocation.Domain

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