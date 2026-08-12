export const JAVA_CODE = "\n import java.util.*; \n public class Main { \n    public static void main(String[] args) { \n        System.out.println(\"Hello World!\"); \n   } \n }"
export const BACKEND = "http://127.0.0.1:8000"
export const WEBSOCKET_URL = "ws://localhost:8080/?uid=" 
export interface User {
    id : number;
    username :string, 
    email :string,
    isAuthenticated :boolean
}
export const JAVA_CODE1 = `public class Main {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`