import { Material, Doubt, Answer, UserProfile, NotificationItem } from '../types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-1',
    email: 'aarav.sharma@college.edu',
    full_name: 'Aarav Sharma',
    college: 'National Institute of Technology',
    course: 'B.E / B.Tech',
    semester: '6th Semester',
    bio: 'Computer Science undergraduate passionate about systems programming and competitive algorithms. Always happy to explain data structures!',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    role: 'student',
    created_at: '2025-08-15T10:00:00Z'
  },
  {
    id: 'user-2',
    email: 'priya.patel@univ.edu',
    full_name: 'Priya Patel',
    college: 'University School of Information Technology',
    course: 'BCA',
    semester: '4th Semester',
    bio: 'Software enthusiast, open source contributor, and tech club lead. Focus on Database Systems and Web Architectures.',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    role: 'student',
    created_at: '2025-09-02T12:30:00Z'
  },
  {
    id: 'user-3',
    email: 'rohit.verma@eng.edu',
    full_name: 'Rohit Verma',
    college: 'Delhi Technological University',
    course: 'B.E / B.Tech',
    semester: '5th Semester',
    bio: 'Electronics and Embedded Systems fanatic. Sharing lecture notes and lab experiments.',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    role: 'student',
    created_at: '2025-10-10T14:15:00Z'
  },
  {
    id: 'admin-1',
    email: 'moderator@studyhub.edu',
    full_name: 'Prof. Ananya Sen (Admin)',
    college: 'StudyHub Academic Board',
    course: 'Other',
    semester: '8th Semester',
    bio: 'Platform Academic Moderator and Curriculum Reviewer.',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    role: 'admin',
    created_at: '2025-01-01T08:00:00Z'
  }
];

export const INITIAL_MATERIALS: Material[] = [
  {
    id: 'mat-1',
    title: 'Data Structures & Algorithms - Complete Handwritten Lecture Notes',
    description: 'Comprehensive handwritten and digitized notes covering Arrays, Linked Lists, Stacks, Queues, Binary Trees, AVL Trees, Graphs, Dijkstra algorithm, Dynamic Programming, and Time Complexity analysis.',
    subject: 'Data Structures & Algorithms',
    course: 'B.E / B.Tech',
    semester: '3rd Semester',
    material_type: 'Notes',
    file_type: 'PDF',
    file_size: '4.8 MB',
    file_name: 'DSA_Comprehensive_Notes_Sem3.pdf',
    file_url: '#download-dsa-notes',
    uploader_id: 'user-1',
    uploader_name: 'Aarav Sharma',
    uploader_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    uploader_college: 'National Institute of Technology',
    views_count: 1420,
    downloads_count: 685,
    tags: ['DSA', 'Trees', 'Graphs', 'Dynamic Programming', 'Algorithms'],
    created_at: '2026-02-14T09:30:00Z'
  },
  {
    id: 'mat-2',
    title: 'Operating Systems Lab Manual & Shell Scripting Guide',
    description: 'Detailed practical manual with solved UNIX shell scripts, CPU Scheduling algorithms (FCFS, SJF, Round Robin), Banker Algorithm implementation in C, and Semaphore mutex examples.',
    subject: 'Operating Systems',
    course: 'B.E / B.Tech',
    semester: '4th Semester',
    material_type: 'Lab Manuals',
    file_type: 'PDF',
    file_size: '3.2 MB',
    file_name: 'OS_Lab_Manual_and_Codes.pdf',
    file_url: '#download-os-manual',
    uploader_id: 'user-2',
    uploader_name: 'Priya Patel',
    uploader_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    uploader_college: 'University School of Information Technology',
    views_count: 980,
    downloads_count: 420,
    tags: ['OS', 'Shell Scripting', 'Semaphores', 'Deadlock', 'Linux'],
    created_at: '2026-03-01T11:20:00Z'
  },
  {
    id: 'mat-3',
    title: 'Database Management Systems (DBMS) University Past 5-Year Solved Papers',
    description: 'Past semester examination question papers with step-by-step solutions for ER modeling, Relational Algebra queries, SQL joins, BCNF Normalization, and Transaction ACID properties.',
    subject: 'Database Management Systems',
    course: 'BCA',
    semester: '4th Semester',
    material_type: 'Question Papers',
    file_type: 'PDF',
    file_size: '6.1 MB',
    file_name: 'DBMS_Solved_Papers_2021_2025.pdf',
    file_url: '#download-dbms-papers',
    uploader_id: 'user-2',
    uploader_name: 'Priya Patel',
    uploader_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    uploader_college: 'University School of Information Technology',
    views_count: 1850,
    downloads_count: 910,
    tags: ['DBMS', 'SQL', 'Normalization', 'Exam Prep', 'Past Papers'],
    created_at: '2026-02-28T14:45:00Z'
  },
  {
    id: 'mat-4',
    title: 'Computer Networks & TCP/IP Quick Revision Cheat Sheet',
    description: 'High-yield two-page summary sheet of OSI layers, IP addressing formulas, CIDR subnetting calculation cheats, TCP vs UDP headers, and routing protocols (OSPF, BGP).',
    subject: 'Computer Networks',
    course: 'B.E / B.Tech',
    semester: '5th Semester',
    material_type: 'Cheat Sheets',
    file_type: 'PDF',
    file_size: '1.4 MB',
    file_name: 'Computer_Networks_Formula_Sheet.pdf',
    file_url: '#download-cn-cheatsheet',
    uploader_id: 'user-3',
    uploader_name: 'Rohit Verma',
    uploader_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    uploader_college: 'Delhi Technological University',
    views_count: 1240,
    downloads_count: 730,
    tags: ['Networks', 'TCP/IP', 'Subnetting', 'CheatSheet', 'Exam Prep'],
    created_at: '2026-03-05T16:10:00Z'
  },
  {
    id: 'mat-5',
    title: 'Object-Oriented Programming with Java - Complete Slide Deck',
    description: 'Clean lecture presentations explaining Polymorphism, Inheritance, Interfaces, Exception handling hierarchy, Java Generics, and Collections Framework with practical code snippets.',
    subject: 'Java Programming',
    course: 'BCA',
    semester: '3rd Semester',
    material_type: 'PPT',
    file_type: 'PPTX',
    file_size: '12.5 MB',
    file_name: 'Java_OOP_Full_Lecture_Series.pptx',
    file_url: '#download-java-ppt',
    uploader_id: 'user-1',
    uploader_name: 'Aarav Sharma',
    uploader_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    uploader_college: 'National Institute of Technology',
    views_count: 860,
    downloads_count: 340,
    tags: ['Java', 'OOP', 'Collections', 'Presentations'],
    created_at: '2026-03-10T10:00:00Z'
  },
  {
    id: 'mat-6',
    title: 'Discrete Mathematics & Graph Theory Reference Notes',
    description: 'Rigorous derivations of Set theory, Propositional Logic, Pigeonhole Principle, Recurrence Relations, Planar Graphs, Euler paths, and Trees with theorem proofs.',
    subject: 'Discrete Mathematics',
    course: 'B.Sc',
    semester: '2nd Semester',
    material_type: 'Notes',
    file_type: 'PDF',
    file_size: '3.9 MB',
    file_name: 'Discrete_Math_Theorem_Notes.pdf',
    file_url: '#download-discrete-math',
    uploader_id: 'user-3',
    uploader_name: 'Rohit Verma',
    uploader_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    uploader_college: 'Delhi Technological University',
    views_count: 650,
    downloads_count: 290,
    tags: ['Discrete Math', 'Logic', 'Graph Theory', 'Proofs'],
    created_at: '2026-03-12T13:30:00Z'
  }
];

export const INITIAL_DOUBTS: Doubt[] = [
  {
    id: 'doubt-1',
    title: 'How does Dijkstra algorithm handle negative edge weights, or why does it fail?',
    description: 'I understand Dijkstra algorithm works greedily by picking the vertex with the minimum distance. But our professor mentioned it gives wrong answers if there are negative edges. Can someone explain with a simple 3-node counterexample why the greedy choice fails here and what algorithm should be used instead?',
    subject: 'Data Structures & Algorithms',
    course: 'B.E / B.Tech',
    semester: '3rd Semester',
    tags: ['Dijkstra', 'Graph Theory', 'Algorithms', 'Shortest Path'],
    author_id: 'user-2',
    author_name: 'Priya Patel',
    author_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    author_college: 'University School of Information Technology',
    views_count: 420,
    upvotes_count: 18,
    status: 'Answered',
    created_at: '2026-03-14T11:00:00Z'
  },
  {
    id: 'doubt-2',
    title: 'Difference between B-Tree and B+ Tree indexing in Database storage engines?',
    description: 'Why do major production databases (like MySQL InnoDB and PostgreSQL) prefer B+ Trees instead of standard B-Trees for table indexing? What are the exact physical storage and range query advantages?',
    subject: 'Database Management Systems',
    course: 'BCA',
    semester: '4th Semester',
    tags: ['DBMS', 'Indexing', 'B-Tree', 'Storage Engine', 'SQL'],
    author_id: 'user-3',
    author_name: 'Rohit Verma',
    author_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    author_college: 'Delhi Technological University',
    views_count: 310,
    upvotes_count: 12,
    status: 'Answered',
    created_at: '2026-03-15T09:30:00Z'
  },
  {
    id: 'doubt-3',
    title: 'How does Deadlock Prevention differ from Deadlock Avoidance in Operating Systems?',
    description: 'Both seem to prevent a deadlock from happening before it occurs, but what is the theoretical difference in terms of resource utilization and Bankers Algorithm requirement? Any real life analogy would help!',
    subject: 'Operating Systems',
    course: 'B.E / B.Tech',
    semester: '4th Semester',
    tags: ['Operating Systems', 'Deadlock', 'Bankers Algorithm', 'Concurrency'],
    author_id: 'user-1',
    author_name: 'Aarav Sharma',
    author_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    author_college: 'National Institute of Technology',
    views_count: 185,
    upvotes_count: 8,
    status: 'Answered',
    created_at: '2026-03-18T15:20:00Z'
  },
  {
    id: 'doubt-4',
    title: 'In TCP 3-Way Handshake, why is 2-way handshake not sufficient for connection establishment?',
    description: 'If Client sends SYN and Server replies with ACK/SYN, why cant the connection start immediately? Why do we need the 3rd ACK from the client? What specific old duplicate packet problem does it solve?',
    subject: 'Computer Networks',
    course: 'B.E / B.Tech',
    semester: '5th Semester',
    tags: ['Computer Networks', 'TCP', 'Handshake', 'Protocols'],
    author_id: 'user-2',
    author_name: 'Priya Patel',
    author_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    author_college: 'University School of Information Technology',
    views_count: 140,
    upvotes_count: 6,
    status: 'Unanswered',
    created_at: '2026-03-20T08:45:00Z'
  }
];

export const INITIAL_ANSWERS: Answer[] = [
  {
    id: 'ans-1',
    doubt_id: 'doubt-1',
    author_id: 'user-1',
    author_name: 'Aarav Sharma',
    author_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    author_college: 'National Institute of Technology',
    content: `Great question! Dijkstra's algorithm is fundamentally built on a **greedy assumption**: once a node's shortest path distance is finalized (popped from the priority queue and marked visited), its distance cannot ever be improved by taking longer paths.

With negative edge weights, this assumption breaks down. Consider 3 nodes: A (start), B, and C:
- A -> B has weight 5
- A -> C has weight 2
- C -> B has weight -4

1. Dijkstra starts at A: dist[A] = 0.
2. It expands neighbors: dist[C]=2, dist[B]=5.
3. Greedily, C is finalized first because 2 < 5.
4. Next, B is finalized with distance 5.
5. But the path A -> C -> B has total weight 2 + (-4) = -2, which is strictly less than 5!
Since B was already finalized, standard Dijkstra will NOT re-evaluate it, resulting in the wrong shortest path.

**Solution**:
Use the **Bellman-Ford algorithm**, which relaxes all edges |V| - 1 times and can even detect negative cycles in O(V * E) time!`,
    upvotes_count: 24,
    is_accepted: true,
    created_at: '2026-03-14T12:15:00Z',
    replies: [
      {
        id: 'rep-1',
        answer_id: 'ans-1',
        author_id: 'user-2',
        author_name: 'Priya Patel',
        author_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
        content: 'The 3-node counterexample makes it crystal clear! Thank you so much Aarav!',
        created_at: '2026-03-14T13:00:00Z'
      }
    ]
  },
  {
    id: 'ans-2',
    doubt_id: 'doubt-2',
    author_id: 'user-1',
    author_name: 'Aarav Sharma',
    author_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    author_college: 'National Institute of Technology',
    content: `Databases overwhelmingly favor **B+ Trees** for two primary physical storage architecture reasons:

1. **Internal Node Capacity & Cache Efficiency**: In a B-Tree, both internal nodes and leaf nodes store actual data pointers/tuples. In a B+ Tree, internal nodes ONLY store routing keys. Because keys take up much fewer bytes, an internal node can hold significantly more branch pointers (higher fanout). This drastically lowers tree height (typically 3-4 levels for millions of rows), meaning fewer disk I/O operations.
2. **Linked Leaf Nodes for Range Queries**: In B+ Trees, all leaves are linked together in a sequential linked list. When you execute \`SELECT * WHERE age BETWEEN 20 AND 30\`, the DB finds the first leaf node in O(log N) and simply scans horizontally across the linked leaf nodes, rather than traversing up and down the tree as required in standard B-Trees.`,
    upvotes_count: 17,
    is_accepted: true,
    created_at: '2026-03-15T10:45:00Z',
    replies: []
  },
  {
    id: 'ans-3',
    doubt_id: 'doubt-3',
    author_id: 'user-3',
    author_name: 'Rohit Verma',
    author_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    author_college: 'Delhi Technological University',
    content: `Here is the key distinction:

- **Deadlock Prevention**: Static design-time constraints. It eliminates deadlocks by ensuring that at least one of Coffman's 4 conditions (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait) can NEVER hold true. For example: forcing all processes to request resources in strict ascending numerical order breaks circular wait. The downside is low hardware resource utilization.
- **Deadlock Avoidance**: Dynamic runtime monitoring. The OS allows any request condition to occur, but before granting a resource, it runs an algorithm (like Dijkstra's Banker's Algorithm) to verify that granting it keeps the system in a **Safe State** (a sequence exists where all processes can finish). If not safe, the process is made to wait even if the resource is currently free!`,
    upvotes_count: 9,
    is_accepted: true,
    created_at: '2026-03-18T16:10:00Z',
    replies: []
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    user_id: 'user-1',
    title: 'Answer Marked as Best Answer',
    message: 'Priya Patel accepted your answer to "How does Dijkstra algorithm handle negative edge weights?". You earned +25 reputation points!',
    type: 'accepted',
    link: '/doubts/doubt-1',
    is_read: false,
    created_at: '2026-03-14T12:20:00Z'
  },
  {
    id: 'notif-2',
    user_id: 'user-1',
    title: 'Upvote on Material',
    message: 'Your study material "Data Structures & Algorithms - Complete Handwritten Lecture Notes" reached 600+ downloads!',
    type: 'material',
    link: '/materials/mat-1',
    is_read: false,
    created_at: '2026-03-16T08:15:00Z'
  },
  {
    id: 'notif-3',
    user_id: 'user-1',
    title: 'New Discussion in Your Subject',
    message: 'A new question was posted in Data Structures & Algorithms: "AVL tree double rotation condition".',
    type: 'answer',
    link: '/doubts',
    is_read: true,
    created_at: '2026-03-17T14:00:00Z'
  }
];
