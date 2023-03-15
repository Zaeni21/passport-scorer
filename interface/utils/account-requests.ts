import axios from "axios";
import { SiweMessage } from "siwe";

const SCORER_BACKEND = process.env.NEXT_PUBLIC_PASSPORT_SCORER_BACKEND;

export type ApiKeys = {
  id: string;
  name: string;
  prefix: string;
  created: string;
};

export const createApiKey = async (name: ApiKeys["name"]) => {
  try {
    const token = localStorage.getItem("access-token");
    const response = await axios.post(
      `${SCORER_BACKEND}account/api-key`,
      { name },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = await response;
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateApiKey = async (
  apiKeyId: ApiKeys["id"],
  name: ApiKeys["name"]
) => {
  try {
    const token = localStorage.getItem("access-token");
    const response = await axios.patch(
      `${SCORER_BACKEND}account/api-key/${apiKeyId}`,
      { name },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
};

export const getApiKeys = async (): Promise<ApiKeys[]> => {
  try {
    const token = localStorage.getItem("access-token");
    const response = await axios.get(`${SCORER_BACKEND}account/api-key`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteApiKey = async (apiKeyId: ApiKeys["id"]): Promise<void> => {
  try {
    const token = localStorage.getItem("access-token");
    await axios.delete(`${SCORER_BACKEND}account/api-key/${apiKeyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

export type DraftCommunity = {
  name: string;
  description: string;
  use_case: string;
  rule: string;
  scorer: string;
};

export type Community = DraftCommunity & {
  id: number;
  created_at: string;
};

export type CommunityPatch = {
  name: string | undefined;
  description: string | undefined;
};

export const createCommunity = async (community: DraftCommunity) => {
  try {
    const token = localStorage.getItem("access-token");
    const response = await axios.post(
      `${SCORER_BACKEND}account/communities`,
      { ...community },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const getCommunities = async (): Promise<Community[]> => {
  try {
    const token = localStorage.getItem("access-token");
    const response = await axios.get(`${SCORER_BACKEND}account/communities`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateCommunity = async (
  communityId: Community["id"],
  community: CommunityPatch
) => {
  try {
    const token = localStorage.getItem("access-token");
    const response = await axios.patch(
      `${SCORER_BACKEND}account/communities/${communityId}`,
      { ...community },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const deleteCommunity = async (communityId: Community["id"]) => {
  try {
    const token = localStorage.getItem("access-token");
    const response = await axios.delete(
      `${SCORER_BACKEND}account/communities/${communityId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export type Scorer = {
  label: string;
  id: string;
  description?: string;
};

export type ScorerResponse = {
  scorers: Scorer[];
  currentScorer: string;
};

export type TokenValidationResponse = {
  expDate: Date;
};

export const getCommunityScorers = async (
  communityId: string
): Promise<ScorerResponse> => {
  try {
    const token = localStorage.getItem("access-token");
    const response = await axios.get(
      `${SCORER_BACKEND}account/communities/${communityId}/scorers`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;

    const scorers: Scorer[] = data.scorers;

    return {
      scorers,
      currentScorer: data.current_scorer,
    };
  } catch (error) {
    throw error;
  }
};

export const updateCommunityScorers = async (
  communityId: string,
  scorerType: string
) => {
  try {
    const token = localStorage.getItem("access-token");
    const response = await axios.put(
      `${SCORER_BACKEND}account/communities/${communityId}/scorers`,
      { scorer_type: scorerType },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const getNonce = async () => {
  const response = await axios.get(`${SCORER_BACKEND}account/nonce`);
  const { data } = response;
  return data.nonce;
};

export const authenticate = async (message: SiweMessage, signature: string) => {
  try {
    const response = await axios.post(`${SCORER_BACKEND}account/verify`, {
      message,
      signature,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyToken = async (
  token: string
): Promise<TokenValidationResponse> => {
  try {
    const response = await axios.post(
      `${SCORER_BACKEND}account/validate_token`,
      { token },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const exp = response.data.exp;
    const expDate = new Date(exp * 1000);
    return { expDate };
  } catch (error) {
    throw error;
  }
};
