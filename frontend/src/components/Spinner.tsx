import { Spinner, Text, VStack ,Center } from "@chakra-ui/react"

export const Loader = ()=>{
return (<div className = "bg-dark w-full h-120 flex justify-center">
    <Center>
        <Spinner color="blue.500" animationDuration="0.8s" />
    </Center>
</div>
  )
}