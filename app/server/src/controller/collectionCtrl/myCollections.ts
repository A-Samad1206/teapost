import { Request, Response } from 'express';
import pagination from '../../lib/pagination';
import { asyncHandler } from '../../lib/utils';
import StoryCollection from '../../models/StoryCollection';

// @desc      myCollections
// @route     GET /api/v1/collections/my
// @access    Auth

const myCollections = asyncHandler(async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user._id;
  const query = StoryCollection.find({
    user,
  });
  pagination(req, res, { query, label: 'mycollections' });
});

export default myCollections;
