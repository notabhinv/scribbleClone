import java.sql.SQLOutput;
import java.util.*;
class Main{
  static void main() {
    int[] arr = {0,0,1};
    int idx = arr.length-1;
    for(int i = 0;i<arr.length;i++)
    {
      if(arr[i]==0)
      {
        for(int j = i;j<idx;j++)
        {
          int t = arr[j+1];
          arr[j+1] = arr[j];
          arr[j] = t;
        }
        idx--;
      }
    }
    for(int i : arr) System.out.print(i+" ");
  }
}
