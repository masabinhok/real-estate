// setuo our appwrite client
import {Account, Avatars, Client, OAuthProvider} from 'react-native-appwrite'
import * as linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'


// set up config
export const config = {
  platform: 'com.jsm.restate',
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

// create a new appwrite client
export const client = new Client();

// set client with the required configs, and ! is not null, telling ts that we know it's not null
client
.setEndpoint(config.endpoint!)
.setProject(config.projectId!)
.setPlatform(config.platform!)

// features to add from appwrite, avatar generates a image using clients first and last name, account is for user account management
export const avatar = new Avatars(client);
export const account = new Account(client);


export async function login() {
  try {
    const redirectUri = linking.createURL('/');

    const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);

    if(!response) {
      throw new Error('Failed to login');
    }

    const browserResult = await WebBrowser.openAuthSessionAsync(
      response.toString(),
      redirectUri
    )

    if(browserResult.type !== 'success') {
      throw new Error('Failed to login');
    }

    const url = new URL(browserResult.url);

    const secret = url.searchParams.get('secret')?.toString();
    const userId = url.searchParams.get('userId')?.toString();


    if(!secret || !userId) throw new Error('Failed to login');

    const session = await account.createSession(userId, secret);

    if(!session) throw new Error('Failed to create a session');

    return true;

  }
  catch(error){
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession('current');
    return true;
  } catch(error){
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const response = await account.get();

    if(response.$id){
      const userAvatar = avatar.getInitials(response.name);
      return {
        ...response,
        avatar: userAvatar.toString(),
      }
    }
    
  } catch(error){
    console.error(error);
    return null; 
  }
}
