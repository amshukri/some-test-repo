import React from 'react';
import { View, Text, Button  } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import SetmirageScreen from './screens/SetmirageScreen'
import ProfileScreen from './screens/ProfileScreen';
import PartnerScreen from './screens/PartnerScreen';
import CoupleMatchedScreen from './screens/CoupleMatchedScreen';
import HomeScreen from './screens/HomeScreen';
import QuestionsScreen from './screens/QuestionsScreen';
import TipsScreen from './screens/TipsScreen';
import QuestionScreen from './screens/QuestionScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import CoupleProfileScreen from './screens/CoupleProfileScreen';
import UploadimgScreen from './screens/UploadimgScreen';
import PinCodeScreen from './screens/PinCodeScreen';
import WaitingScreen from './screens/WaitingScreen';
import AddVowsScreen from './screens/AddVowsScreen';
import VowsScreen from './screens/VowsScreen';
import UpdateVows from './screens/UpdateVowsScreen';
import SmsScreen from './screens/SmsScreen';
import CalendarScreen from './screens/CalendarScreen';
import KeyDatesScreen from './screens/KeyDatesScreen';
import KeyDateScreen from './screens/KeyDateScreen';
import SpecialMomentScreen from './screens/SpecialMomentScreen';
import NothingBoxScreen from './screens/NothingBoxScreen';
import SetMenstruationScreen from './screens/SetMenstruationScreen';
import InvitationsScreen from './screens/InvitaionsScreen';
import ConfirmInvitationScreen from './screens/ConfirmInvitationScreen';
import DyksScreen from './screens/DyksScreen';
import BirthdayScreen from './screens/BirthdayScreen'
import SimpleBottomNavigationScreen from './screens/SimpleBottomNavigationScreen' ;
import NavbottomScreen from './screens/NavbottomScreen';
import FunctionsBoardScreen from './screens/FunctionsBoardScreen';
import CouplesScreen from './screens/CouplesScreen';
import QuestionsmapScreen from './screens/QuestionsmapScreen'
import LovemapsScreen from './screens/LovemapsScreen';
import GalleryScreen from './screens/GalleryScreen';
import AlbumScreen from './screens/AlbumScreen';
import PhotoScreen from './screens/PhotoScreen';
import LogoutScreen from './screens/LogoutScreen';
import BookmarkedScreen from './screens/BookmarkedScreen';
import AddVowsPartnerScreen from './screens/AddVowsPartnerScreen';
import MenuLoveMapsScreen from './screens/MenuLoveMapsScreen';
import AnswersResultScreen from './screens/AnswersResultScreen';
import PartnerAnswerScreen from './screens/PartnerAnswerScreen';
import PeriodeCycleScreen from './screens/PeriodeCycleScreen';
import CarouselScreen from './screens/CarouselScreen';
import PeriodStateScreen from './screens/PeriodStateScreen';
import CalendarPeriodScreen from './screens/CalendarPeriodScreen';
import PeriodDetailsScreen from './screens/PeriodDetailsScreen';
import PeriodeCycleMaleScreen from './screens/PeriodeCycleMaleScreen';
import WalkthrowScreen from './screens/WalkthrowScreen'; 

const RootNavigator = StackNavigator({
  Walkthrow : {
      screen : WalkthrowScreen
  }, 
   Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerTitle: 'Login',
      headerLeft: null,
    },
  },
  Register: {
    screen: RegisterScreen,
  
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      headerTitle: 'Complete Your Profile',
    },
  },
  Partner : {
    screen : PartnerScreen,
    navigationOptions: {
      headerTitle: 'Partner',
      headerLeft: null,
    },
  },

  SimpleBottomNavigationScreen : {
    screen : SimpleBottomNavigationScreen
  },

  bookmarked : {
    screen : BookmarkedScreen ,
    navigationOptions: {
      headerTitle: 'Your Daily Tips', 
    },
  },

  CalendarPeriod : {
    screen : CalendarPeriodScreen ,


  },

  PeriodeCycleMale : {
    screen : PeriodeCycleMaleScreen
  },

  Logout : {
    screen : LogoutScreen,

  },

  PeriodDetails : {
    screen : PeriodDetailsScreen,
    navigationOptions: {
      headerTitle: 'Details', 
    },
  },

  Carousel : {
    screen : CarouselScreen 
  },

  PeriodeCycle :{
    screen : PeriodeCycleScreen
  },

  PeriodState : {
      screen : PeriodStateScreen,
      navigationOptions: {
        headerTitle: 'Your Period Cycle', 
      },
  },

  PartnerAnswer : {
    screen : PartnerAnswerScreen ,
  },

  AddVowsPartner : {
    screen : AddVowsPartnerScreen 
  },

  CoupleMatched : {
    screen : CoupleMatchedScreen ,
  },
  Home: {
    screen : HomeScreen,
    navigationOptions: {
      headerTitle: 'Home',
      headerLeft: null,
    },
  },

  Lovemaps : {
    screen : LovemapsScreen ,
    navigationOptions: {
     headerTitle: 'LoveMaps', 
     },
  },
  
  Questionsmap : {
    screen : QuestionsmapScreen ,
    navigationOptions: {
     headerTitle: 'QuestionMap', 
     },
  },
  
  Questions : {
    screen : QuestionsScreen,
    navigationOptions: {
      headerTitle: 'Questions',
    },
  },
  Question : {
    screen : QuestionScreen,
    navigationOptions: {
      headerTitle: 'Daily Question',
      headerLeft: null,
    },
  },

  Birthday : {
    
    screen : BirthdayScreen,
    navigationOptions: {
      headerTitle: 'Birthday',
    
    },
  },

  setmirage : {
    
    screen : SetmirageScreen,
    navigationOptions: {
      headerTitle: 'mirage',
    
    },
  },
  Tips : {
    screen : TipsScreen,
   
    navigationOptions: {
      headerTitle: 'Tips',
    },
  },

  Notifications : {
    screen : NotificationsScreen,
   
    navigationOptions: {
      headerTitle: 'FCM',
    },
  },

  CouplesProfile : {
     screen :  CoupleProfileScreen,
      navigationOptions: {
      headerTitle: 'Couples Profile',
    },
  },

  Image : {
    screen :  UploadimgScreen,
     navigationOptions: {
     headerTitle: 'Image Upload Test',
   },
 },

 Pin : {
  screen :  PinCodeScreen,
   navigationOptions: {
   headerTitle: 'PIN CODE ',
   headerLeft: null,
 },
},

Couples : {
screen : CouplesScreen
},

Gallery : {
  screen : GalleryScreen,
  navigationOptions: {
    headerTitle: 'Albums ',
 
  },
},

Album : {
 screen : AlbumScreen ,
 navigationOptions: {
  headerTitle: 'Gallery ',

},
},



AddVows : {
  screen :  AddVowsScreen,
   navigationOptions: {
   headerTitle: 'Add Your Vows ',
   headerLeft: null,
 },
},

Vows : {
  screen :  VowsScreen,
   navigationOptions: {
   headerTitle: 'Partner Vows',
 
 },
},
UpdateVows : {
  screen :  UpdateVows,
   navigationOptions: {
   headerTitle: 'Update Your Vows',
 
 },
},

functionBoard : {
  screen : FunctionsBoardScreen,
  navigationOptions: {
  headerTitle: 'Update Your Vows',

  },
},

 SMS: {
  screen :  SmsScreen,
   navigationOptions: {
   headerTitle: 'SMS',
 
 },
},

Photo: {
  screen : PhotoScreen,
  navigationOptions: {
    headerTitle: 'Detail',
  },
},

Wait : { 
  screen : WaitingScreen ,
  navigationOptions: {
    headerTitle: 'Waiting for Partner',
    headerLeft: null,
  
  },
 },

 
 
 KeyDates :  { 
  screen : KeyDatesScreen ,
  navigationOptions: {
  headerTitle: 'KeyDates',
  
  },
 },
 KeyDate :  { 
  screen : KeyDateScreen ,
  navigationOptions: {
  headerTitle: 'KeyDates',
  
  },
 },
 
 SpecialMoment : { 
  screen : SpecialMomentScreen ,
  navigationOptions: {
  headerTitle: 'Sp Moments',
  
  },

 },
 AnswersResult : {
  screen : AnswersResultScreen,
  navigationOptions: {
    headerTitle: 'Love Maps',
    
    },
},

 MenuLoveMaps : {
  screen : MenuLoveMapsScreen,
  navigationOptions: {
    headerTitle: 'Love Maps',
    
    },
 },
 NothingBox :  { 
  screen :  NothingBoxScreen ,
  navigationOptions: {
  headerTitle: 'NothingBox',
  
  },
 },

 SetMenstruation :  { 
  screen :  SetMenstruationScreen ,
  navigationOptions: {
  headerTitle: 'Set Menstruation',
  
  },
 },

 Invitations :  { 
  screen :  InvitationsScreen ,
  navigationOptions: {
  headerTitle: 'Invitations List',
  
  },
 },
 ConfirmInvitations :  { 
  screen :   ConfirmInvitationScreen ,
  navigationOptions: {
  headerTitle: 'Confirm Invitation',
  
  },
 },

  Dyks :  { 
  screen :    DyksScreen ,
  navigationOptions: {
  headerTitle: 'Dyks',
  
  },
 },

 Navbar :  { 
  screen :    NavbottomScreen ,
  navigationOptions: {
  headerTitle: 'Dyks',
  
  },
 },

 
 
 
});





export default RootNavigator;