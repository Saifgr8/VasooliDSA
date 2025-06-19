// src/data/mockUsers.js
export const mockUsers = [
  {
    username: "AliceSmith",
    totalPoints: 500,
    problemsSolved: { easy: 80, medium: 21, hard: 12 },
    lastActivityDate: "2025-05-27T10:00:00Z",
  },
  {
    username: "BobJohnson",
    totalPoints: 750,
    problemsSolved: { easy: 110, medium: 28, hard: 5 },
    lastActivityDate: "2025-05-26T14:30:00Z",
  },
  {
    username: "CharlieBrown",
    totalPoints: 300,
    problemsSolved: { easy: 55, medium: 32, hard: 2 },
    lastActivityDate: "2025-05-27T08:15:00Z",
  },
  {
    username: "DianaPrince",
    totalPoints: 600,
    problemsSolved: { easy: 85, medium: 42, hard: 5 },
    lastActivityDate: "2025-05-25T18:00:00Z",
  },
];
export const mockData = [
  {
    problemName: "Two Sum",
    problemLink: "https://leetcode.com/problems/two-sum/",
    difficulty: "Easy",
    languageUsed: "Python",
    submittedOn: "2025-05-10T10:30:00Z",
    code: "def twoSum(nums, target):\n    hash_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in hash_map:\n            return [hash_map[complement], i]\n        hash_map[num] = i\n    return []",
    notes: "Used a hash map for O(n) solution.",
  },
  {
    problemName: "Add Two Numbers",
    problemLink: "https://leetcode.com/problems/add-two-numbers/",
    difficulty: "Medium",
    languageUsed: "Java",
    submittedOn: "2025-05-12T14:15:00Z",
    code: "class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        // ... your code ...\n    }\n}",
    notes: "Linked list traversal.",
  },
  {
    problemName: "Longest Substring Without Repeating Characters",
    problemLink:
      "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    difficulty: "Medium",
    languageUsed: "JavaScript",
    submittedOn: "2025-05-15T09:00:00Z",
    code: "var lengthOfLongestSubstring = function(s) {\n    // ... your code ...\n};",
    notes: "Sliding window approach with a set.",
  },
  {
    problemName: "Median of Two Sorted Arrays",
    problemLink: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    difficulty: "Hard",
    languageUsed: "C++",
    submittedOn: "2025-05-18T16:45:00Z",
    code: "class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        // ... your code ...\n    }\n};",
    notes: "Binary search on partitions.",
  },
  {
    problemName: "Container With Most Water",
    problemLink: "https://leetcode.com/problems/container-with-most-water/",
    difficulty: "Medium",
    languageUsed: "Python",
    submittedOn: "2025-05-20T11:00:00Z",
    code: "def maxArea(height):\n    # ... your code ...",
    notes: "Two pointers approach.",
  },
  {
    problemName: "3Sum",
    problemLink: "https://leetcode.com/problems/3sum/",
    difficulty: "Medium",
    languageUsed: "JavaScript", // Changed to JavaScript as the code is JS
    submittedOn: "2025-05-22T13:30:00Z",
    code: `
  function threeSum(nums) {
      const result = []; // This will store all unique triplets that sum to zero
  
      // 1. Sort the array
      // Sorting is crucial for two reasons:
      // a) It allows us to use the two-pointer technique efficiently.
      // b) It makes it easy to handle duplicates.
      nums.sort((a, b) => a - b);
  
      const n = nums.length;
  
      // 2. Iterate through the array with the first pointer (i)
      // We iterate up to n - 2 because we need at least two more elements (j and k) after 'i'.
      for (let i = 0; i < n - 2; i++) {
          // Skip duplicate values for the first element
          // If the current element is the same as the previous one,
          // it means we've already considered triplets starting with this value.
          if (i > 0 && nums[i] === nums[i - 1]) {
              continue;
          }
  
          // 3. Initialize two pointers: 'left' and 'right'
          // 'left' starts just after 'i', and 'right' starts at the end of the array.
          let left = i + 1;
          let right = n - 1;
  
          // 4. Use the two-pointer technique to find the remaining two numbers
          while (left < right) {
              const sum = nums[i] + nums[left] + nums[right];
  
              if (sum === 0) {
                  // Found a triplet that sums to zero!
                  result.push([nums[i], nums[left], nums[right]]);
  
                  // Move both pointers to find other potential triplets
                  left++;
                  right--;
  
                  // Skip duplicate values for 'left' pointer
                  // After finding a valid triplet, move 'left' past any duplicates
                  // to ensure uniqueness of the triplets.
                  while (left < right && nums[left] === nums[left - 1]) {
                      left++;
                  }
  
                  // Skip duplicate values for 'right' pointer
                  // Similarly, move 'right' past any duplicates.
                  while (left < right && nums[right] === nums[right + 1]) {
                      right--;
                  }
              } else if (sum < 0) {
                  // If the sum is less than zero, we need a larger sum.
                  // Move the 'left' pointer to the right to increase the sum.
                  left++;
              } else { // sum > 0
                  // If the sum is greater than zero, we need a smaller sum.
                  // Move the 'right' pointer to the left to decrease the sum.
                  right--;
              }
          }
      }
  
      return result;
  }`,
    notes: "Sorting and two pointers.",
  },
  {
    problemName: "Longest Palindromic Substring",
    problemLink: "https://leetcode.com/problems/longest-palindromic-substring/",
    difficulty: "Medium",
    languageUsed: "Python",
    submittedOn: "2025-04-05T09:45:00Z",
    code: "def longestPalindrome(s):\n    # ... your code ...",
    notes: "Dynamic programming or expand around center.",
  },
  {
    problemName: "Reverse Integer",
    problemLink: "https://leetcode.com/problems/reverse-integer/",
    difficulty: "Easy",
    languageUsed: "C++",
    submittedOn: "2025-04-08T17:00:00Z",
    code: "class Solution {\npublic:\n    int reverse(int x) {\n        // ... your code ...\n    }\n};",
    notes: "Handle integer overflow.",
  },
  {
    problemName: "String to Integer (atoi)",
    problemLink: "https://leetcode.com/problems/string-to-integer-atoi/",
    difficulty: "Medium",
    languageUsed: "JavaScript",
    submittedOn: "2025-04-10T10:10:00Z",
    code: "var myAtoi = function(s) {\n    // ... your code ...\n};",
    notes: "Edge cases and constraints.",
  },
  {
    problemName: "Palindrome Number",
    problemLink: "https://leetcode.com/problems/palindrome-number/",
    difficulty: "Easy",
    languageUsed: "Python",
    submittedOn: "2025-04-12T12:00:00Z",
    code: "def isPalindrome(x):\n    # ... your code ...",
    notes: "Convert to string or reverse half number.",
  },
  {
    problemName: "Regular Expression Matching",
    problemLink: "https://leetcode.com/problems/regular-expression-matching/",
    difficulty: "Hard",
    languageUsed: "Python",
    submittedOn: "2025-04-20T18:00:00Z",
    code: "def isMatch(s, p):\n    # ... your code ...",
    notes: "Dynamic programming.",
  },
  {
    problemName: "Merge Two Sorted Lists",
    problemLink: "https://leetcode.com/problems/merge-two-sorted-lists/",
    difficulty: "Easy",
    languageUsed: "Java",
    submittedOn: "2025-04-25T11:40:00Z",
    code: "class Solution {\n    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n        // ... your code ...\n    }\n}",
    notes: "Iterative or recursive approach.",
  },
];
export const calculatePoints = (solvedC) => {
  let points = 0;
  const pointsMap = {
    easy: 2,
    medium: 7,
    hard: 20,
  };
  if (solvedC && typeof solvedC === "object") {
    if (solvedC.easy !== undefined) {
      points = points + solvedC.easy * pointsMap.easy;
    }
    if (solvedC.medium !== undefined) {
      points = points + solvedC.medium * pointsMap.medium;
    }
    if (solvedC.hard !== undefined) {
      points = points + solvedC.hard * pointsMap.hard;
    }
  }
  return points;
};
