import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        List<Integer> list = new ArrayList<>();
        for(int i = 0; i < n; i++){
            int num = sc.nextInt();
            list.add(num);
        }
        int sum = 0;
        for(int x : list){
            sum += x;
        }
        System.out.println("Sum of number of list is + " + sum);
        sc.close();
    }
}