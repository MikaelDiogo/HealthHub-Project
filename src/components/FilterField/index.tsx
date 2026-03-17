import { TextInput } from "@mantine/core";

export const FilterField = () => {
    return(
     <TextInput
     className="w-96"
      size="md"
      radius="md"
      placeholder="Pesquisar Pacientes"
     />
    );
}