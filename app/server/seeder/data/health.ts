import Primary, {
  PrimaryCommentDocument,
} from '../../src/models/Comment/Primary';
import Secondary, {
  SecondaryCommentDocument,
} from '../../src/models/Comment/Secondary';
import Story, { StoryDocument } from '../../src/models/Story';
import User from '../../src/models/User';
import 'colors';
import Profile from '../../src/models/Profile';
import Tag from '../../src/models/Tag';
import Asset from '../../src/models/Asset';
import StoryMeta from '../../src/models/StoryMeta';
import CommentMeta from '../../src/models/Comment/CommentMeta';
import StoryCollection from '../../src/models/StoryCollection';

export const checkCompatibility = async () => {
  console.log('):- Checking Data compatibilties'.blue);

  const users = await User.find({}).lean();
  const stories = await Story.find({}).populate('meta').lean();
  const primaries = await Primary.find({}).populate('meta').lean();
  const secondaries = await Secondary.find({}).populate('meta').lean();
  const totalStories = users.reduce(
    (total, crtUser) => total + crtUser.stories,
    0
  );
  if (totalStories != stories.length) {
    console.log(
      `Total stories eexist in DB conflict with no of stories registered in User schema`
    );
  }

  const totalComments = stories.reduce(
    (total, crtStory) => total + crtStory.noOfComments,
    0
  );

  if (primaries.length + secondaries.length != totalComments) {
    console.log(
      `Total comments exist in DB conflict with no of comments registered in Story schema`
    );
  }

  let everyThingNotHonkeyDory = 0;

  const areGradesCompatible = (
    docs:
      | StoryDocument[]
      | PrimaryCommentDocument[]
      | SecondaryCommentDocument[],
    label: string
  ) => {
    everyThingNotHonkeyDory = 0;
    docs.forEach((doc) => {
      if (
        doc.noOfLikes != 0 &&
        (!doc?.meta || doc.noOfLikes != doc.meta.likedBy.length)
      ) {
        everyThingNotHonkeyDory++;
        console.log(`${label} with id ${doc._id} have mismatch like fields.`);
      }

      if (
        doc.noOfDislikes != 0 &&
        (!doc?.meta || doc.noOfDislikes != doc.meta.dislikedBy.length)
      ) {
        everyThingNotHonkeyDory++;
        console.log(
          `${label} with id ${doc._id} have mismatch dislike fields.`
        );
      }
    });
    if (everyThingNotHonkeyDory)
      console.log(
        `${everyThingNotHonkeyDory} ${label} is not according to schemas`
      );
  };
  // @ts-ignore
  areGradesCompatible(stories, 'Story');
  // @ts-ignore
  areGradesCompatible(primaries, 'Primary Comment');
  // @ts-ignore
  areGradesCompatible(secondaries, 'Secondary Comment');

  console.log(`Total Tags ${await Tag.countDocuments()}`.blue.italic);
  console.log(`Total Users ${users.length}`.blue.italic);
  console.log(`Total Profiles ${await Profile.countDocuments()}`.blue.italic);
  console.log(
    `Total Collections ${await StoryCollection.countDocuments()}`.blue.italic
  );
  console.log(`Total Assets ${await Asset.countDocuments()}`.blue.italic);
  console.log(`Total Stories ${stories.length}`.blue.italic);
  console.log(
    `Total StoryMetas ${await StoryMeta.countDocuments()}`.blue.italic
  );
  console.log(`Total Primary ${primaries.length}`.blue.italic);
  console.log(`Total Secondary ${secondaries.length}`.blue.italic);
  console.log(
    `Total Primary +  Secondary ${primaries.length + secondaries.length}`.blue
      .italic
  );

  console.log(
    `Total CommentMetas ${await CommentMeta.countDocuments()}`.blue.italic
  );
};
