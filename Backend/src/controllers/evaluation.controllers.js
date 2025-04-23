import {ApiError} from '../util/ApiError.js';
import {ApiResponse} from '../util/ApiResponse.js';
const skills=[
    {
      "name": "DSA",
      "subpoints": [
        "Arrays",
        "Strings",
        "Linked Lists",
        "Stacks",
        "Queues",
        "Hashing",
        "Trees",
        "Binary Search Trees",
        "Heaps",
        "Graphs",
        "Tries",
        "Recursion",
        "Dynamic Programming",
        "Greedy Algorithms",
        "Backtracking",
        "Divide and Conquer",
        "Sliding Window",
        "Two Pointers",
        "Bit Manipulation",
        "Disjoint Set"
      ]
    },
    {
      "name": "JavaScript",
      "subpoints": [
        "Variables & Data Types",
        "Operators",
        "Functions",
        "Arrays & Objects",
        "Loops & Conditions",
        "DOM Manipulation",
        "Event Handling",
        "Callbacks",
        "Promises",
        "Async/Await",
        "Closures",
        "Scope & Hoisting",
        "this Keyword",
        "ES6+ Features",
        "Classes & Inheritance",
        "Fetch API / Axios",
        "Error Handling",
        "JSON",
        "Modules"
      ]
    },
    {
      "name": "Java",
      "subpoints": [
        "Data Types & Variables",
        "Operators",
        "Loops & Control Flow",
        "Arrays",
        "Classes & Objects",
        "Inheritance",
        "Polymorphism",
        "Abstraction",
        "Encapsulation",
        "Exception Handling",
        "Collections Framework",
        "Threads & Concurrency",
        "File Handling",
        "Input/Output Streams",
        "Lambda Expressions",
        "Streams API",
        "JDBC",
        "Java 8 Features"
      ]
    },
    {
      "name": "C++",
      "subpoints": [
        "Variables & Data Types",
        "Operators",
        "Control Structures",
        "Arrays & Strings",
        "Functions",
        "Pointers & References",
        "Structures & Unions",
        "Classes & Objects",
        "Constructors & Destructors",
        "Inheritance",
        "Polymorphism",
        "STL - Vectors",
        "STL - Maps",
        "STL - Sets",
        "STL - Queues",
        "STL - Stacks",
        "STL - Priority Queues",
        "File I/O",
        "Templates",
        "Exception Handling"
      ]
    },
    {
      "name": "Python",
      "subpoints": [
        "Variables & Data Types",
        "Operators",
        "Conditional Statements",
        "Loops",
        "Functions",
        "Lists",
        "Tuples",
        "Sets",
        "Dictionaries",
        "String Manipulation",
        "File Handling",
        "Exception Handling",
        "OOP Concepts",
        "List Comprehensions",
        "Lambda Functions",
        "Modules & Packages",
        "Decorators",
        "Generators",
        "Iterators",
        "Regular Expressions",
        "venv & Pip",
        "Popular Libraries (NumPy, Pandas, Matplotlib)"
      ]
    }
  ]
  // i have yo send the data to frontend based on skill name
  async function getData(req,res){
   try {
     const skill=req.params.skill;
     console.log(skill)
     const data = skills.find(s => s.name === skill);
     console.log(data)
     res.status(200).json(new ApiResponse(200,data,"skill data"));
   } catch (error) {
        res.status(200).json(new ApiError(500,'internal server error'));
   }

  }  
export {getData};