import {  Box, Button } from "@chakra-ui/react";
import { Provider } from "@/components/ui/provider";
import { Center, Splitter } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { useState, useEffect, useRef } from "react";
// import type * as monaco from "monaco-editor";
import { Textarea } from "@/components/Textarea";
import { BACKEND, JAVA_CODE } from "@/lib/lib";
import { useSelector} from "react-redux";
import {Loader} from "@/components/Spinner" ; 
import axios from "axios";
export default function Dashboard() {
  const [code, setCode] = useState<string>(JAVA_CODE);
  const [input, setInput] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const { id } = useSelector(
    (state: any) => state.user,
  );
  const [output, setOutput] = useState<string>("");
  const socketRef = useRef<WebSocket | null>(null);
  const [loadingTextArea , setLoadingTextArea] = useState<boolean>(false)
  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8080/?uid=" + id);
    socketRef.current.onopen = () => {
      console.log("WebSocket connection opened");
    };
    socketRef.current.onmessage = (event) => {
      setLoadingTextArea(false)
      setOutput(event.data);
      console.log("this is my websocket data") ; 
      console.log(event.data) 
      if (socketRef.current) {
        socketRef.current.onerror = (error) => {
          console.error("WebSocket error:", error);
        };
      }
    };
    return () => {
      if (socketRef.current) {
        console.log("closing websocket") ; 
        socketRef.current.close();
      }
    };
  }, []);

  function handleEvent(
    value: string | undefined,
    //event: monaco.editor.IModelContentChangedEvent,
  ) {
    if (value) {
      console.log(value);
      setCode(value);
    }
    return code;
  }
  function takeInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    console.log(e.target.value);
  }
  async function submitCode() {
    console.log("onclick cliked");
    setLoading(true);
    setLoadingTextArea(true); 
    const res = await axios.post(
      BACKEND,
      {
        code: code,
        input: input,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    );
    if (res.status === 200) {
      setLoading(false);
    }
    console.log(res);
  }

  return (
    <Provider>
      <Button
        loading={isLoading}
        onClick={submitCode}
        size="xs"
        marginTop="5px"
        marginBottom="10px"
        marginLeft="10px"
      >
        {" "}
        Compile{" "}
      </Button>

      <Box width="dvw" height="dvh">
        <Splitter.Root
          panels={[{ id: "a" }, { id: "b" }]}
          borderWidth="1px"
          minH="60"
        >
          <Splitter.Panel id="a">
            <Box>
              <Editor
                height="100vh"
                theme="vs-dark"
                onChange={handleEvent}
                defaultLanguage="java"
                defaultValue={JAVA_CODE}
              />
            </Box>
          </Splitter.Panel>
          <Splitter.ResizeTrigger id="a:b" />
          <Splitter.Panel id="b">
            <Center boxSize="full" textStyle="">
              <Splitter.Root
                panels={[{ id: "c" }, { id: "d" }]}
                orientation="vertical"
                borderWidth="1px"
                minH="60"
              >
                <Splitter.Panel id="c">
                  <div className="h-screen w-full bg-white text-black">
                    <Textarea
                      children={"Input Here "}
                      readonly={false}
                      onChange={takeInput}
                    />
                  </div>
                </Splitter.Panel>
                <Splitter.ResizeTrigger id="c:d" />
                <Splitter.Panel id="d">
                  <div className="bg-white w-full h-screen text-black">
                    {loadingTextArea ? <Loader/>:<Textarea
                      children={output}
                      readonly={true}
                      onChange={() => {}}
                    />} 
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
