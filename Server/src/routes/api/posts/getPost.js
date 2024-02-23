const { Post } = require('../../../model');
const logger = require('../../../logger');
const { createErrorResponse } = require('../../../response');

/** 
 * Fetch a specific post with its unique id
*/
module.exports = async (req, res) => {
    try {
        const { postId } = req.params
 
        const post = await Post.getPost(postId)
        if (!post) throw new Error('Could not find post')

        res.status(200).json(post);
    } catch (e) {
        logger.error({ e }, e.message)
        res.status(400).json(e)

    }
}