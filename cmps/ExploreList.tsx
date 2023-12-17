import { Post, Comment } from '../typings'
import ExplorePreview from './ExplorePreview'

interface ExploreListProps {
    posts: Post[]
}

const ExploreList: React.FC<ExploreListProps> = ({ posts }) => {

    return (
        <div>
            {posts.map(post => <ExplorePreview key={post._id} post={post} />)}
        </div>
    )
}

export default ExploreList

