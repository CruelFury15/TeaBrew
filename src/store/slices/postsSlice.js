import { createSlice } from '@reduxjs/toolkit';

const mockPosts = [
  { id: '1',  type: 'short-video', thumbnail: 'https://images.unsplash.com/photo-1610070835787-e209e94b56e2?w=400', duration: '0:59',  title: "POV: You found the group chat where they talk about YOU 💀",                          temperature: 98,  sips: 2543,  spills: 456,  stirs: 892,  author: 'spillqueen99',     publishDate: 'Apr 3, 2026',  category: 'VIRAL'     },
  { id: '2',  type: 'text',        content: "My manager literally scheduled a 1-on-1 at 4:55 PM on a Friday. I'm shaking. If I get fired I'm exposing the ENTIRE slack history. 🤡",                                    temperature: 95,  sips: 5432,  spills: 1234, stirs: 2341, author: 'officedrama_',     publishDate: 'Apr 4, 2026',  category: 'RECEIPTS'  },
  { id: '3',  type: 'long-video',  thumbnail: 'https://images.unsplash.com/photo-1701933810995-3331d9ff463b?w=600', duration: '10:24', title: "STORYTIME: How my bestie dated my brother and hid it for 2 YEARS 🐍",                temperature: 88,  sips: 3211,  spills: 678,  stirs: 1456, author: 'teateller22',      publishDate: 'Apr 2, 2026',  category: 'DRAMA'     },
  { id: '4',  type: 'text',        content: "Not the brand apologizing in the notes app with font size 10 😭😭 PLS be so serious right now.",                                                                          temperature: 75,  sips: 1120,  spills: 200,  stirs: 150,  author: 'brandwatch_',      publishDate: 'Apr 5, 2026',  category: 'CRINGE'    },
  { id: '5',  type: 'short-video', thumbnail: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=400', duration: '0:15',  title: "Caught in 4K 📸 Screenshot before this gets deleted!!",                             temperature: 99,  sips: 8900,  spills: 4000, stirs: 5600, author: 'caught4k',         publishDate: 'Apr 5, 2026',  category: 'EXPOSED'   },
  { id: '6',  type: 'text',        content: "The way my ex just posted 'healing era' after what THEY did to ME??? The audacity is astronomical 🤯",                                                                   temperature: 92,  sips: 4200,  spills: 890,  stirs: 1670, author: 'exfiles_',         publishDate: 'Apr 1, 2026',  category: 'DRAMA'     },
  { id: '7',  type: 'long-video',  thumbnail: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',   duration: '8:45',  title: "Exposing my toxic workplace: They made us work UNPAID overtime 😤",                  temperature: 94,  sips: 6700,  spills: 2100, stirs: 3400, author: 'worktea_anon',     publishDate: 'Mar 30, 2026', category: 'EXPOSED'   },
  { id: '8',  type: 'short-video', thumbnail: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400', duration: '0:42', title: "When your friend's story doesn't match what they told you last week 👀",              temperature: 87,  sips: 3890,  spills: 920,  stirs: 1560, author: 'receipts_only',    publishDate: 'Apr 3, 2026',  category: 'SUS'       },
  { id: '9',  type: 'text',        content: "Just found out my roommate has been using my Netflix account to watch their shows... and they've been complaining about MY recommendations 💀",                           temperature: 79,  sips: 2340,  spills: 450,  stirs: 890,  author: 'roomie_drama',     publishDate: 'Apr 4, 2026',  category: 'CRINGE'    },
  { id: '10', type: 'short-video', thumbnail: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400',   duration: '0:38',  title: "The receipts are RECEIPTING 📱 She said she was at home but...",                     temperature: 96,  sips: 7200,  spills: 3100, stirs: 4200, author: 'spillmaster_',     publishDate: 'Apr 5, 2026',  category: 'RECEIPTS'  },
  { id: '11', type: 'long-video',  thumbnail: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600',   duration: '12:15', title: "FULL BREAKDOWN: Why I cut off my entire friend group (with screenshots)",             temperature: 91,  sips: 5600,  spills: 1800, stirs: 2900, author: 'friendshipover',   publishDate: 'Mar 28, 2026', category: 'DRAMA'     },
  { id: '12', type: 'text',        content: "Someone explain why my coworker just cc'd the ENTIRE company on an email calling out my 'attitude' ??? I'm about to reply all 🔥",                                      temperature: 93,  sips: 4900,  spills: 1500, stirs: 2200, author: 'workplacetea',     publishDate: 'Apr 4, 2026',  category: 'EXPOSED'   },
  { id: '13', type: 'short-video', thumbnail: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400', duration: '0:51', title: "My sister borrowed my dress and RUINED it... wait for the end 😱",                    temperature: 85,  sips: 3400,  spills: 780,  stirs: 1340, author: 'sisterspill_',     publishDate: 'Apr 2, 2026',  category: 'VIRAL'     },
  { id: '14', type: 'text',        content: "The influencer who scammed me just blocked me after I asked for a refund. Time to make a thread 🧵",                                                                     temperature: 89,  sips: 4100,  spills: 1100, stirs: 1900, author: 'scamwatch_',       publishDate: 'Apr 3, 2026',  category: 'CANCELLED' },
  { id: '15', type: 'long-video',  thumbnail: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600', duration: '9:30', title: "I catfished my catfish and you won't BELIEVE what happened 🎣",                       temperature: 97,  sips: 9100,  spills: 4500, stirs: 6200, author: 'catfishstories',   publishDate: 'Mar 31, 2026', category: 'VIRAL'     },
  { id: '16', type: 'short-video', thumbnail: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400',   duration: '0:29',  title: "POV: You accidentally sent the screenshot TO the person 💀💀💀",                    temperature: 100, sips: 12000, spills: 5600, stirs: 8900, author: 'accidentalspill',  publishDate: 'Apr 5, 2026',  category: 'RECEIPTS'  },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    allPosts: mockPosts,
    userPosts: [], // Posts created by the current user
  },
  reducers: {
    addPost: (state, action) => {
      const newPost = {
        ...action.payload,
        id: Date.now().toString(),
        temperature: Math.floor(Math.random() * 30) + 70, // Random temp 70-100
        sips: 0,
        spills: 0,
        stirs: 0,
        publishDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };
      state.allPosts.unshift(newPost);
      state.userPosts.unshift(newPost);
    },
    updatePost: (state, action) => {
      const { id, content, title } = action.payload;
      // Update in allPosts
      const postIndex = state.allPosts.findIndex(p => p.id === id);
      if (postIndex !== -1) {
        if (content !== undefined) state.allPosts[postIndex].content = content;
        if (title !== undefined) state.allPosts[postIndex].title = title;
      }
      // Update in userPosts
      const userPostIndex = state.userPosts.findIndex(p => p.id === id);
      if (userPostIndex !== -1) {
        if (content !== undefined) state.userPosts[userPostIndex].content = content;
        if (title !== undefined) state.userPosts[userPostIndex].title = title;
      }
    },
    deletePost: (state, action) => {
      const id = action.payload;
      state.allPosts = state.allPosts.filter(p => p.id !== id);
      state.userPosts = state.userPosts.filter(p => p.id !== id);
    },
  },
});

export const { addPost, updatePost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
