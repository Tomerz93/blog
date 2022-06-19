import { Post } from 'contentlayer/generated'
import { compareDesc } from 'date-fns';

const getPostsWithFeatured = (posts: Post[]) =>
    posts.reduce((acc, post) => post.isFeatured ? {
        ...acc,
        featuredPost: post
    } : {
        ...acc,
        posts: [...acc['posts'], post]
    }, { posts: [], featuredPost: undefined } as { posts: Post[], featuredPost: Post | undefined })

const getSortedPosts = (posts: Post[]) => posts.sort((a, b) => {
    return compareDesc(new Date(a.createdAt), new Date(b.createdAt));
});

export {
    getPostsWithFeatured, getSortedPosts
}