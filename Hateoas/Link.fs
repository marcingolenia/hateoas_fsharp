[<AutoOpen>]
module Link

type Link = {
    Rel: string
    Href: string
}

type ConfirmationDto = { Message: string; Links: Link list }

type ResponseDto<'a> = {
    Members: 'a
    Links: Link list
}