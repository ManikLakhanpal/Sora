import java.util.*;

class Solution {
    public int maxSum(int[] nums, int k, int m) {
        int n = nums.length;
        
        List<int[]> subarrays = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n && j - i + 1 <= n; j++) {
                sum += nums[j];
                if (j - i + 1 >= m) {
                    subarrays.add(new int[]{i, j, sum});
                }
            }
        }
        
        Collections.sort(subarrays, (a, b) -> b[2] - a[2]);
        
        int total = 0;
        boolean[] used = new boolean[n];
        
        for (int[] sub : subarrays) {
            if (k <= 0) break;
            
            boolean overlap = false;
            for (int i = sub[0]; i <= sub[1]; i++) {
                if (used[i]) {
                    overlap = true;
                    break;
                }
            }
            
            if (!overlap) {
                total += sub[2];
                for (int i = sub[0]; i <= sub[1]; i++) {
                    used[i] = true;
                }
                k--;
            }
        }
        
        return total;
    }

    public static void main(String[] args) {
        Solution s = new Solution();
        int[] nums = {-10,3,-1,-2};

        System.out.print(s.maxSum(nums, 4, 1));
    }
}