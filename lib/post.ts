import { Post } from 'contentlayer/generated'
import { compareDesc } from 'date-fns';
import { groupBy } from './utils';

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

const getAllPostsByCategory = (posts: Post[]) => groupBy(posts, 'category')

const getPostsByCategory = (posts: Post[], category: string) => posts.filter((post) => post.category === category)

const getBlogRecommendations = (posts: Post[], currentPost: Post, limit: number = 3) => posts.filter(
    (p) => p.category === currentPost.category && p.slug !== currentPost.slug
).slice(0, limit);

export {
    getPostsWithFeatured,
    getSortedPosts,
    getAllPostsByCategory,
    getPostsByCategory,
    getBlogRecommendations
}