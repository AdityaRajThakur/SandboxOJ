export const JAVA_CODE = "import java.util.*; \n public class Main { \n    public static void main(String[] args) { \n        System.out.println(\"Hello World!\"); \n   } \n }"
export const BACKEND = "http://127.0.0.1:8000"
export const WEBSOCKET_URL = "ws://localhost:8080/?uid=" 
export interface User {
    id : number;
    username :string, 
    email :string,
    isAuthenticated :boolean
}