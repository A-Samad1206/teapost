import { StoryCollectionType } from '@lib/types/StoryCollectionType';
import axios from '../axios';

export const createCollectionApi = async (reqBody: {
  title: string;
  desciption: string;
}) => {
  try {
    const { data } = await axios.post<{ collection: StoryCollectionType }>(
      '/collections',
      reqBody
    );
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const updateCollectionApi = async (
  collId: string,
  reqBody: {
    title: string;
    desciption: string;
  }
) => {
  try {
    const { data } = await axios.put<{ collection: StoryCollectionType }>(
      `/collections/${collId}`,
      reqBody
    );

    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const deleteCollection = async (collectionId: string) => {
  try {
    const { data } = await axios.delete(`/collections/${collectionId}`);
    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const buildCollectionApi = async (reqObj: {
  addTo: string[];
  removeFrom: string[];
  storyId: string;
}) => {
  try {
    const { data } = await axios.patch(`/collections/build`, reqObj);
    return data;
  } catch (err: any) {
    throw err?.response?.data || 'Invalid Data';
  }
};
