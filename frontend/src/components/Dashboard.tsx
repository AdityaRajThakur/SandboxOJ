import { HStack, Box, Theme } from "@chakra-ui/react";
import { Provider } from "@/components/ui/provider";
import { Center, Splitter } from "@chakra-ui/react";
import Editor from '@monaco-editor/react';
import { useState } from "react";
import type * as monaco from 'monaco-editor';
import {Textarea} from "@/components/Textarea";
import { JAVA_CODE } from "@/lib/data";
export default function Dashboard() {
  const [code , setCode] = useState<string>(JAVA_CODE); 
  
  function handleEvent(value : string | undefined  , event : monaco.editor.IModelContentChangedEvent){
  if(value){
    console.log(value); 
    setCode(value) ; 
  }
  return code ; 
}
  return (
    <Provider>
      <Box width="dvw" height="dvh" padding= "10px" >
        <Splitter.Root
          panels={[{ id: "a" }, { id: "b" }]}
          borderWidth="1px"
          minH="60"
        >
          <Splitter.Panel id="a">
            <Box paddingTop= "10px">
                <Editor height="100vh" theme= "vs-dark" onChange = {handleEvent} defaultLanguage="java" defaultValue={JAVA_CODE} />
            </Box>
          </Splitter.Panel>
          <Splitter.ResizeTrigger id="a:b" />
          <Splitter.Panel id="b">
            <Center boxSize="full" textStyle="2xl">
              <Splitter.Root
                panels={[{ id: "c" }, { id: "d" }]}
                orientation="vertical"
                borderWidth="1px"
                minH="60"
              >
                <Splitter.Panel id="c">
                  <div className="h-screen w-full bg-white text-black">
                    <Textarea children = {"Input Here "} />
                  </div>
                </Splitter.Panel>
                <Splitter.ResizeTrigger id="c:d" />
                <Splitter.Panel id="d">
                  <div className="bg-white w-full h-screen text-black">
                    <Textarea children = {"output here"}/>
                  </div>
                </Splitter.Panel>
              </Splitter.Root>
            </Center>
          </Splitter.Panel>
        </Splitter.Root>
      </Box>
    </Provider>
  );
}
