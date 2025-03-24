export interface SignUpVariables {
  name: string;
  breed: "elf" | "man" | "sauron" | "dwarf";
  email: string;
  password: string;
}

export interface SignInVariables {
  email: string;
  password: string;
}
