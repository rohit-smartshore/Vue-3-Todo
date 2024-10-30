export type dropDown = {
  name: string,
  value: string
}

export type validation = {
  emailError: string | null,
  passwordError: string | null,
  confirmPassErr: string | null,
  requiredEmailErr: string | null,
  requiredPasswordErr: string | null,
  requiredNameErr: string | null,
}

export type validations = {
  listName: string | null,
  taskName: string | null,
}

// export type List = Array<ListItem>
export type List = ListItem[]

export type ListItem = {
  id: number,
  name: string,
  userId: number
}

export type selectedList = {
  index: number
  listId: number,
  userId: number
}

export type listContentState = Array<listContent>

export type listContent = {
  id: number,
  name: string,
  userId: number,
  list_items: Array<ListItem>
}

export type task = {
  name: string
}

export type createListPayload = {
  name: string,
  list_items: [task]
}

export type createListItem = {
  name: string
}

export type tokenContentType =
  ({
    id: number,
    name: string,
    email: string,
    iat: number,
    exp: number
  }) | null

