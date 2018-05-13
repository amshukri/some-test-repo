import React from 'react';
import { ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  BackAndroid, 
  BackHandler,
  ScrollView,
  AsyncStorage,
  Image,Dimensions,
  TouchableOpacity, 
  Modal,
  ImageBackground,
  TouchableWithoutFeedback} from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import * as firebase from 'firebase' ;
import {StackNavigator} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import {RkTextInput,RkText,RkButton} from 'react-native-ui-kitten';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Moment from 'moment';
 

export default class HomeTScreen extends React.Component {
  static navigationOptions = {
    headerStyle : {display:"none"}
  }

    state = {
        email: '',
        authenticating: false,
        UID : '',
        gender : '',
        first_name:'',
        last_name :'',
        birthday : '',
        showmenstrual : false,
        weight : '',
        height : '', 
        partnerBirthday : false ,
        partnerFound:false,
        dailytipid: '',
        dailytiptext : 'If an argument gets too heated, take a 20- minute break, and agree to approach the topic again when you are both calm',
        phone:'',
        bookmarked: false,
        modalVisible: false,
        modalfeeling: false,
        activeT : 0 ,
        modalVisible2: false,
        daystogether : '0' ,
        ActivityIndicatorV : true ,
 
        pbordercolor : '#fff',
      }

      openModaltip() {
        this.setState({modalVisible2:true}); 
      } 

      closeModaltip() { 
        if (this.state.bookmarked )
        {
          this.bookmarktip(this.state.dailytipid); 
        }
        
        
        this.setState({modalVisible2:false}); 
      }  
      openModal() {
        this.setState({modalVisible:true});
        
      }
 
      openmodalfeeling()
      {
        this.setState({modalfeeling:true})
      }

      closemodalfeeling()
      {
        this.setState({modalfeeling:false})
      }

      bookmarkon () {
      
        this.setState({bookmarked:true})

       // this.closeModaltip()
      }

      bookmarktip (tipid) 
      {
            firebase.auth().onAuthStateChanged((user) => {
        
            fetch('http://vps477048.ovh.net/vows/webservice/setbookmarktips/', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_id : user.uid ,
                tip_id : tipid,
         
               }),
              }) 
              .then(response => response.json())
              .then(response => { 
  
              })
              .catch((error) => {
                  console.log(error);
              });  
            
           })
      }

      seenTips(id){
        console.log('http://vps477048.ovh.net/vows/webservice/seentips/'+this.state.UID);
          fetch('http://vps477048.ovh.net/vows/webservice/seentips/'+this.state.UID, {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  tip_id : id ,
              }),
              })

              .then(response => response.json())
              .then(response => { 
                console.log('Seentips' +id + ' ' +  this.state.UID);
                      console.log(response);
                  
              })
              .catch((error) => {
                  console.log(error);
              });          
              
      }

      getTips(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              this.setState({UID:user.uid});
                fetch('http://vps477048.ovh.net/vows/webservice/checkdailytips/'+user.uid, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    })
                    .then(response => response.json())
                    .then(response => { 
                            console.log(response);
                            if (response.length > 0 )
                            {
                                this.setState({ modalVisible2:true,
                                                dailytiptext:response[0].message ,
                                                dailytipid : response[0].id_tip  })
                                                this.setState({
                                                  UID : user.uid,
                                                  email : user.email,
                                              })
                                this.seenTips(response[0].id_tip)
                                
                            } 
                            
                    })
                    .catch((error) => {
                        console.log(error);
                    });          
            }
        })
      }


        getcoupleinfo()
        {
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
           fetch('http://vps477048.ovh.net/vows/webservice/getuser/'+user.uid, {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              })
              .then(response => response.json())
              .then(response => {
                this.setState({ActivityIndicatorV:false}) 
                let oneDay = 24*60*60*1000;
                let today = firstDate = new Date();
                let todaybirthday = Moment(today).format('MM-DD') ;
               
                console.log('Birthday : ' + Moment(response.birthday).format('MM-DD') + ' TodayBirthday ' + todaybirthday);
               
 
                      this.setState({
                        first_name: response.first_name,
                        gender : response.gender, 
                      })

                      if (response.gender == 'male')
                      {

                          if (response.couple.female.first_name != null)
                          {

                            this.setState({
                              partnerFound : true,
                              partner_name: response.couple.female.first_name,
                              pbordercolor : '#ff8b81',
                              partnerbirthdate : response.couple.female.birthday,
                          
                            })


                            if (Moment(response.couple.female.birthday).format('MM-DD') == todaybirthday)
                            { 
                              this.setState({
                                partnerBirthday : true,
                              
                              }) 
                            } 
                          } 

                      }else{

                        if (response.couple.male.first_name != null)
                        {
                          this.setState({
                            partnerFound : true,
                            partner_name: response.couple.male.first_name,
                            pbordercolor : '#64b2ff',
                            partnerbirthdate : response.couple.male.birthday,
                          })

                          if (Moment(response.couple.male.birthday).format('MM-DD') == todaybirthday)
                          { 
                            this.setState({
                              partnerBirthday : true,
                            
                            }) 
                          }


                        }

                      }
  
                    
                      let miraage = new Date(response.couple.marriage_date);
                      this.setState({ daystogether :  Math.round(Math.abs((today.getTime() - miraage.getTime())/(oneDay))) })
                  
                  }
               )
              .catch((error) => {
                  console.log(error);
              });  }}) 
             
              
        }


      closeModal() { 
        this.setState({modalVisible:false}); 
      }
        getWifeMonstruation(){
          firebase.auth().onAuthStateChanged((user) => {

            fetch('http://vps477048.ovh.net/vows/webservice/wifemonstruations/'+user.uid, {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
          
              }) 
              .then(response => { 
                console.log(response);
              })
              .catch((error) => {
                  console.log(error);
              }); 
            

           })
         
        }

      
        checkpartnerperiod ()
        {
          firebase.auth().onAuthStateChanged((user) => {
            
            fetch('http://vps477048.ovh.net/vows/webservice/partnerinmenstrualcycle/'+user.uid, {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              }, 
              }) 
              .then(response => response.json())
              .then(response => { 
                console.log(response);
                  if (response.length > 0 )
                this.setState({
                    showmenstrual : true
                })
                
              })
              .catch((error) => {
                  console.log(error);
              }); 
          })
        }

      componentDidMount() {
     //     this.getTips(); 
          this.getcoupleinfo();
          this.checkpartnerperiod() ;
      
      }
       
             render(){
       
            const { navigate } = this.props.navigation;
       
            return (
              <View style={{ flex: 1 }}>
              { this.state.ActivityIndicatorV ? 
              <View style={{flexDirection:'row',alignContent:'center',alignItems:'center',justifyContent:'center',height:Dimensions.get('window').height}}>
              <ActivityIndicator size='large'></ActivityIndicator>
              
              </View>
              : 
              <View>
              { this.state.partnerFound ?  
                <View style={{  height:Dimensions.get('window').height}}>
            <ScrollView >
                   <View style={styles.container}>
                   <View style={{flexDirection:'row' ,justifyContent: 'flex-end',marginRight:37,marginBottom:10}}>
                   <Image source={require('../Assets/CoupleIconHome.png')}  style={{width:40,height:40,marginTop:25,marginRight:10}}/>
                   <Text style={{color:'#758696',fontSize:22,marginTop:33,textAlign:'right'}}>{this.state.daystogether} days</Text>
                 </View>
                  <View style={{flexDirection:'row'}} >
                    <View style={{ width:'50%'}}>
                    { this.state.gender == 'male' ? 
                      <Text style={{fontWeight:'bold', color:'#64b2ff',fontSize:22,marginTop:36,marginLeft:'10%',fontFamily:'Roboto-Regular'}}>{this.state.first_name}</Text>
                    :
                      <Text style={{fontWeight:'bold', color:'#ff8b81',fontSize:22,marginTop:36,marginLeft:'10%' ,fontFamily:'Roboto-Regular'}}>{this.state.first_name}</Text>
                      } 
                          <View style={{flexDirection:'column'}}>
                          { this.state.gender == 'male' ? 
                              <RkButton 
                                  style={{marginBottom:'20%',backgroundColor:'#64b2ff',marginTop:25,marginLeft:'10%',width:138,height:30}}
                                  contentStyle={{fontSize : 12}} 
                                
                                  >
                                    Take Personality Test
                              </RkButton>
                            :
                                <RkButton 
                                style={{marginBottom:'20%',backgroundColor:'#ff8b81',marginTop:25,marginLeft:'10%',width:138,height:30}}
                                contentStyle={{fontSize : 12}}  
                                >
                                  Take Personality Test
                                  </RkButton>
                        }
                        <View style={{flexDirection:'row'}}>
                            <Text style={{ color:'#758696',fontSize:13,marginLeft:'12%',marginTop:-20,marginBottom:20}} onPress={() => this.openModal()}>Already taken test</Text>
                            <Image source={require('../Assets/testArrow.png')}  style={{width:6,height:10,marginTop:-15,marginLeft:20}}/>
                        </View>
                          </View>
                    </View>
                    <View style={{ width:'46%',borderWidth:3 ,borderColor :  this.state.pbordercolor,marginTop:25,marginRight:50,borderRadius:5}}  >
                    
                    { this.state.gender == 'male' ? 
                        <Text style={{fontWeight:'bold', color:'#ff8b81',fontSize:22,marginTop:9,marginLeft:19,fontFamily:'Roboto-Regular'}}>{this.state.partner_name}</Text>
                      :
                      <Text style={{fontWeight:'bold', color:'#64b2ff',fontSize:22,marginTop:9,marginLeft:19,fontFamily:'Roboto-Regular'}}>{this.state.partner_name}</Text>
                      
                    } 
                          <View style={{justifyContent:'center',alignContent:'center'}}>
                          { this.state.gender == 'male' ? 
                                   
                                   <Text style={{ color:'#758696',fontSize:12,textAlign:'center',marginTop:25,width:'75%',marginLeft:25}} onPress={() => this.openModal()}>
                                  No personality test taken yet
                                  </Text>
                            :
                             
                            <Text style={{ color:'#758696',fontSize:12,textAlign:'center',marginTop:25,width:'75%',marginLeft:25}} onPress={() => this.openModal()}>
                                  No personality test taken yet
                                  </Text>
                          }
                        
                           
                
                          </View>
                    </View>
                  </View>

                { this.state.gender == 'female' ?  
                <TouchableOpacity style={{marginBottom:-25}} activeOpacity={0.6} onPress={() => navigate('PreCycle')} >
                      <View style={{width:Dimensions.get('window').width-33,backgroundColor:'#834ca4' ,height:137,marginLeft:'4.5%' ,borderRadius:12 , flexDirection:'row',marginTop:20}} >
                        <Image source={require('../Assets/CircularShapes.png')}  style={{width:95,height:99,marginTop:19,marginRight:30,marginLeft:17}}/>
                          <View style={{flexDirection:'column',marginTop:19}}>
                          <Text style={{color:'#fff',fontSize:25,fontWeight:'bold'}}>Setup your </Text>
                          <Text style={{color:'#fff',fontSize:25,fontWeight:'bold'}}>Period cycle </Text>
                          
                          </View>
                          <View style={{position:'absolute',right:23,bottom:19}}><Image source={require('../Assets/PeriodArrow.png')} style={{width:10,height:18}}  /></View>
                      </View>
               </TouchableOpacity> :  <View></View>
               
              
              
              }

            { this.state.showmenstrual ?  
                <TouchableOpacity style={{marginBottom:-25}} activeOpacity={0.6}  onPress={() => navigate('PeriodeCycleMale')} >
                      <View style={{width:Dimensions.get('window').width-33,backgroundColor:'#834ca4' ,height:89,marginLeft:'4.5%' ,borderRadius:4 , flexDirection:'row',marginTop:20}} >
                        <Image source={require('../Assets/CircularShapes.png')}  style={{position:'absolute',width:115,height:120,marginTop:8,marginRight:30,marginLeft:20}}/>
                          <View style={{flexDirection:'column',marginTop:10,marginLeft:8}}>
                          <Text style={{color:'#fff',fontSize:18,fontWeight:'bold'}}>Jana is {'\n'}experiencing {'\n'} abdominal cramps </Text>
                         
                          
                          </View>
                          <View style={{position:'absolute',right:25,bottom:21}}><Image source={require('../Assets/PeriodArrow.png')} style={{width:10,height:18}}  /></View>
                      </View>
               </TouchableOpacity> 
               : <View></View> 
            }




                  <View style={{width:Dimensions.get('window').width-33,backgroundColor:'#fff',marginLeft:'4.5%' ,borderRadius:3 , flexDirection:'column' ,marginTop:50,marginBottom:100}} >
                    <Text style={{color:'#7c8fa1',fontSize:12,marginLeft:15,marginTop:15,fontFamily:'Roboto-Regular'}}>Tuesday, 3 Feb 2018</Text>
                    <Text style={{color:'#735D78',fontSize:30,marginLeft:15,marginTop:5,fontFamily:'Roboto-Regular'}}>I’m Feeling</Text>
                      <View style={{flexDirection:'column',marginTop:10}}> 

                        <View style={{flexDirection:'row',marginTop:10,justifyContent:'center',alignContent:'center',justifyContent:'space-between'}}> 

                        <TouchableOpacity  onPress={()=> this.openmodalfeeling() }>

                        <View style={{flexDirection:'column'}} >
                        <View style={{backgroundColor:'#efefef' ,width:50,height:50,marginLeft:20,marginRight:10,borderRadius:10,flexDirection:'column',justifyContent:'center',alignContent:'center'}}>
                        <Image source={require('../Assets/EmoLove.png')}  style={{width:45,height:45,margin:2}}/>
                        </View>
                        <Text style={{textAlign:'center',marginLeft:10,fontSize:11,marginTop:4}}>In Love</Text>
                        </View>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.openmodalfeeling() }>
                        <View style={{flexDirection:'column'}} >
                        <View style={{backgroundColor:'#efefef' ,width:50,height:50,marginRight:10,borderRadius:10,flexDirection:'column',justifyContent:'center',alignContent:'center'}}>
                        <Image source={require('../Assets/EmoNervous.png')}  style={{width:45,height:45,margin:2}}/>
                        </View>
                        <Text  style={{marginLeft:5,fontSize:11,marginTop:4}}  >Nervous</Text>
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.openmodalfeeling()}>
                        <View style={{flexDirection:'column'}} >
                        <View style={{backgroundColor:'#efefef' ,width:50,height:50,marginRight:10,borderRadius:10,flexDirection:'column',justifyContent:'center',alignContent:'center'}}>
                        <Image source={require('../Assets/EmoWorried.png')}  style={{width:45,height:45,margin:2}}/>
                        </View>
                        <Text style={{marginLeft:6,fontSize:11,marginTop:4}} >Worried</Text>
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.openmodalfeeling() } >
                        <View style={{flexDirection:'column'}} >
                        <View style={{backgroundColor:'#efefef' ,width:50,height:50,marginRight:20,borderRadius:10,flexDirection:'column',justifyContent:'center',alignContent:'center'}}>
                        <Image source={require('../Assets/EmoCool.png')}  style={{width:45,height:45,margin:2}}/>
                        </View>
                        <Text style={{marginLeft:1,fontSize:11,marginTop:4}}>Chill/Cool</Text>
                        </View>
                        </TouchableOpacity>

                        

                        </View>

                        <View style={{flexDirection:'row',marginTop:20 ,justifyContent:'center',alignContent:'center',justifyContent:'space-between'}}>

                        <TouchableOpacity onPress={()=> this.openmodalfeeling() } >
                        <View style={{flexDirection:'column'}} >
                        <View style={{backgroundColor:'#efefef' ,width:50,height:50,marginLeft:20,marginRight:10,borderRadius:10,flexDirection:'column',justifyContent:'center',alignContent:'center'}}>
                        <Image source={require('../Assets/EmoTired.png')}  style={{width:45,height:45,margin:2}}/>
                        </View>
                        <Text style={{textAlign:'center',marginLeft:10,fontSize:11,marginTop:4}}>Tired</Text>
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.openmodalfeeling()}>
                        <View style={{flexDirection:'column'}} >
                        <View style={{backgroundColor:'#efefef' ,width:50,height:50,marginRight:10,borderRadius:10,flexDirection:'column',justifyContent:'center',alignContent:'center'}}>
                        <Image source={require('../Assets/EmoAngry.png')}  style={{width:45,height:45,margin:2}}/>
                        </View>
                        <Text style={{textAlign:'center',marginLeft:-7,fontSize:11,marginTop:4}}>Angry</Text>
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress = {() => this.openmodalfeeling()}>
                        <View style={{flexDirection:'column'}} >
                        <View style={{backgroundColor:'#efefef' ,width:50,height:50,marginRight:10,borderRadius:10,flexDirection:'column',justifyContent:'center',alignContent:'center'}}>
                        <Image source={require('../Assets/EmoJoyful.png')}  style={{width:45,height:45,margin:2}}/>
                        </View>
                        <Text style={{marginLeft:10 ,fontSize:11,marginTop:4}} >Joyful</Text>
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress = {()=> this.openmodalfeeling()} >
                        <View style={{flexDirection:'column'}} >
                        <View style={{backgroundColor:'#efefef' ,width:50,height:50,marginRight:20,borderRadius:10,flexDirection:'column',justifyContent:'center',alignContent:'center'}}>
                        <Image source={require('../Assets/EmoLoving.png')}  style={{width:45,height:45,margin:2}}/>
                        </View>
                        <Text style={{marginLeft:8,fontSize:11,marginTop:4}} >Loving</Text>
                        </View>
                        </TouchableOpacity>

                      

                        </View>



                        <View style={{flexDirection:'row',marginTop:20,justifyContent:'center',alignContent:'center',justifyContent:'space-between',marginBottom:30}}>

                        <TouchableOpacity onPress={()=> this.openmodalfeeling()} >
                        <View style={{flexDirection:'column'}} >
                        <View style={{backgroundColor:'#efefef' ,width:50,height:50,marginLeft:20,marginRight:10,borderRadius:10,flexDirection:'column',justifyContent:'center',alignContent:'center'}}>
                        <Image source={require('../Assets/EmoFrustrated.png')}  style={{width:45,height:45,margin:2}}/>
                        </View>
                        <Text style={{textAlign:'center',marginLeft:10,fontSize:11,marginTop:4}}>Frustrated</Text>
                        </View>
                       </TouchableOpacity>

                         <TouchableOpacity onPress={ ()=> this.openmodalfeeling()} >
                        <View style={{flexDirection:'column'}} >
                        <View style={{backgroundColor:'#efefef' ,width:50,height:50,marginRight:10,borderRadius:10,flexDirection:'column',justifyContent:'center',alignContent:'center'}}>
                        <Image source={require('../Assets/EmoSad.png')}  style={{width:45,height:45,margin:2}}/>
                        </View>
                        <Text style={{textAlign:'center',marginLeft:-7,fontSize:11,marginTop:4}}>Sad</Text>
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> this.openmodalfeeling()}>
                        <View style={{flexDirection:'column'}} >
                        <View style={{backgroundColor:'#efefef' ,width:50,height:50,marginRight:10,borderRadius:10,flexDirection:'column',justifyContent:'center',alignContent:'center'}}>
                        <Image source={require('../Assets/EmoAngry.png')}  style={{width:45,height:45,margin:2}}/>
                        </View>
                        <Text style={{fontSize:11,marginTop:4}}>Depressed</Text>
                        </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => this.openmodalfeeling()} >
                        <View style={{flexDirection:'column'}} >
                        <View style={{backgroundColor:'#efefef' ,width:50,height:50,marginRight:20,borderRadius:10,flexDirection:'column',justifyContent:'center',alignContent:'center'}}>
                         <Image source={require('../Assets/EmoSmart.png')}  style={{width:45,height:45,margin:2}}/>
                        
                        </View>
                        <Text style={{marginLeft:10,fontSize:11,marginTop:4}}>Smart</Text>
                        </View>
                        </TouchableOpacity>
                       
                      
                        </View>
         
            
                      </View>
                  </View >        
                  
                    {this.state.partnerBirthday ? 
                    <View style={{width:Dimensions.get('window').width-19  ,marginLeft:'0%' ,borderRadius:20,marginLeft:'2.0%' , flexDirection:'row',borderWidth:10,height:120,borderColor:'#efefef',marginTop:-95,marginBottom:100}} >
                      <TouchableOpacity      activeOpacity={0.6}>
                      <ImageBackground  source={require('../Assets/bdBG.png')}  style={{width:Dimensions.get('window').width-35,height:90,marginTop:0,marginRight:10}} borderRadius={10}   >
                      <Image source={require('../Assets/bdBaloons.png')}  style={{resizeMode:'stretch',width:67,height:67,marginTop:8,position:'absolute',right:20}}/>
                         <View style={{flexDirection:'row'}}>
                         <Text style={{color:'#834ca4',marginTop:26,marginLeft:16,fontFamily:'Roboto-Bold',fontSize:24}}>{Moment(this.state.partnerbirthdate).format('DD')}</Text>
                         <View style={{flexDirection:'column',marginTop:20}}>
                                <Text style={{color:'#834ca4',fontFamily:'Roboto-Bold',marginLeft:10,marginTop:7,fontSize:11, textAlign:'center'}}>{Moment(this.state.partnerbirthdate).format('MMM')}</Text>
                                <Text style={{color:'#834ca4',fontFamily:'Roboto-Bold',marginLeft:10 ,fontSize:11}}>2018</Text>
                           </View>
                           <View style={{flexDirection:'column',marginTop:13,marginLeft:10}}>
                                <Text style={{color:'#834ca4',fontFamily:'Roboto-Bold',marginLeft:10,marginTop:7,fontSize:16}}>Celebrate </Text>
                                <Text style={{color:'#834ca4',fontFamily:'Roboto-Bold',marginLeft:10 ,fontSize:16}}>{this.state.partner_name}’s Birthday</Text>
                           </View>
                         </View>
                          </ImageBackground>
                          </TouchableOpacity>
                      </View>
                      : <View></View>

                    }



              </View>
    
            </ScrollView>
                     
            <BottomNavigation
                        activeTab={this.state.activeT} 
                        labelColor="#834ca4"
                        rippleColor="white"
                        style={styles.bottomNavigation}
                      >
                        <Tab
                          barBackgroundColor="#e6e3e3"
                          label="Home"
                          icon={  <Image source={require('../Assets/NavHomeActive.png')}  style={{width:28,height:28 ,margin:-2}}/>}
                          onPress={()=> navigate('Home')}
                       />
                        <Tab
                          barBackgroundColor="#e6e3e3"
                          label="Couples"
                          icon={  <Image source={require('../Assets/NavCoupleActive.png')}  style={{width:24,height:20,marginLeft:-1 }}/>}
                          onPress={()=> navigate('Couples')}
                        />
                        <Tab
                          barBackgroundColor="#e6e3e3"
                          label="Profile"
                          icon={<Image source={require('../Assets/NavProfileActive.png')}  style={{width:28,height:28 ,margin:-2}}/>}
                         
                      />
                        <Tab
                          barBackgroundColor="#e6e3e3"
                          label="Settings"
                          icon={<Image source={require('../Assets/NavSettingsActive.png')}  style={{width:28,height:28 ,margin:-2}}/>}
                          onPress={()=> navigate('Logout')}
                        />
            </BottomNavigation>

                      <Modal
                        transparent= {true}
                        visible={this.state.modalVisible}
                        animationType={'fade'}
                        onRequestClose={() => this.closeModal()}
                        style={{width:'50%'}}
                          >
                            <TouchableWithoutFeedback onPress={()=> this.closeModal()} >
                       <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                          
                  
                            <Text style={{color:'#834ca4',fontSize:16,marginTop:45}}>ENTER YOUR 4 MBTI</Text> 
                            <Text style={{color:'#834ca4',fontSize:16,marginBottom:11}}>LETTER SCORE</Text> 
                             
                            <RkTextInput 
                            rkType='bordered' 
                            style={{backgroundColor:'#e1e1e1',marginBottom:80,marginLeft:40,marginRight:40}} 
                            onChangeText={(thevow) => this.setState({thevow})}
                            value={this.state.partnerName} 
                          /> 
                              <Text  style={{position:'absolute',color:'#834ca4',fontSize:14,bottom:17,right:18,fontFamily:'Roboto-Bold'}} onPress={() => this.closeModal()}>SUBMIT</Text>
                        
                        
                        </View>
                        </View>
                        </TouchableWithoutFeedback>
                      </Modal>

                    <Modal
                        transparent= {true}
                        visible={this.state.modalfeeling}
                        animationType={'fade'}
                        onRequestClose={() => this.closemodalfeeling()}
                        style={{width:'50%'}}
                          >
                           
                       <View style={styles.modalContainer}>

                      <ScrollView  horizontal={true}  >

                      <View style={{  alignItems: 'center',
                                      alignContent:'center',
                                      justifyContent: 'center' ,}}>
                        <View style={{ 
                                        backgroundColor: '#fff',
                                        borderRadius:3, 
                                        height:290,
                                        width:300,
                                        marginLeft : 30,
                                        marginRight : 10}}>
                                                          
                            <Text style={{color:'#7c8fa1',fontSize:12,marginLeft:14,marginTop:14,fontFamily:'Roboto-Regular'}}>Tuesday, 3 Feb 2018</Text>
                            <Text style={{fontSize:20,fontFamily:'Roboto-Regular',marginLeft:17,marginTop:8,color:'#ff8b81'}}>Cool</Text>
                                  
                            <Image source={require('../Assets/cool.png')}  style={{width:270,height:160,marginLeft:15,marginTop:11,borderRadius:8}}/>

                            <Text style={{color:'#758696',fontSize:15.5,fontFamily:'Roboto-Bold',textAlign:'right',marginRight:24,marginTop:12}}>SET</Text>
                        
                        </View>
                      </View>

                      <View style={{  alignItems: 'center',
                                      alignContent:'center',
                                      justifyContent: 'center' ,}}>
                        <View style={{ 
                                        backgroundColor: '#fff',
                                        borderRadius:3, 
                                        height:290,
                                        width:300, 
                                        marginRight : 10}}>
                                                          
                            <Text style={{color:'#7c8fa1',fontSize:12,marginLeft:14,marginTop:14,fontFamily:'Roboto-Regular'}}>Tuesday, 3 Feb 2018</Text>
                            <Text style={{fontSize:20,fontFamily:'Roboto-Regular',marginLeft:17,marginTop:8,color:'#ff8b81'}}>Cool</Text>
                                  
                            <Image source={require('../Assets/cool.png')}  style={{width:270,height:160,marginLeft:15,marginTop:11,borderRadius:8}}/>

                            <Text style={{color:'#758696',fontSize:15.5,fontFamily:'Roboto-Bold',textAlign:'right',marginRight:24,marginTop:12}}>SET</Text>
                        
                        </View>
                      </View>

                      <View style={{  alignItems: 'center',
                                      alignContent:'center',
                                      justifyContent: 'center' ,}}>
                        <View style={{ 
                                        backgroundColor: '#fff',
                                        borderRadius:3, 
                                        height:290,
                                        width:300, 
                                        marginRight : 10}}>
                                                          
                            <Text style={{color:'#7c8fa1',fontSize:12,marginLeft:14,marginTop:14,fontFamily:'Roboto-Regular'}}>Tuesday, 3 Feb 2018</Text>
                            <Text style={{fontSize:20,fontFamily:'Roboto-Regular',marginLeft:17,marginTop:8,color:'#ff8b81'}}>Cool</Text>
                                  
                            <Image source={require('../Assets/cool.png')}  style={{width:270,height:160,marginLeft:15,marginTop:11,borderRadius:8}}/>

                            <Text style={{color:'#758696',fontSize:15.5,fontFamily:'Roboto-Bold',textAlign:'right',marginRight:24,marginTop:12}}>SET</Text>
                        
                        </View>
                      </View>
                  
                    
                        

                        </ScrollView>


                      </View>
                  
                    </Modal>

                    <Modal
                        transparent= {true}
                        visible={this.state.modalVisible2}
                        animationType={'fade'}
                        onRequestClose={() => this.closeModaltip()}
                        style={{width:'50%'}} 
                          >
                        <TouchableWithoutFeedback onPress={()=> this.closeModaltip()} >
                       <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                          
                  
                            <Text style={{color:'#834ca4',fontSize:23,marginTop:28,fontWeight:'bold'}}>Tip of the day</Text> 
                            <Text style={{color:'#834ca4',fontSize:17,marginBottom:40,marginTop:40,width:'80%',textAlign:'center'}}>{this.state.dailytiptext}</Text> 
                             
                        
                           <View style={{backgroundColor:'#E1E1E1',height:48,width:'100%',borderBottomRightRadius:20,borderBottomLeftRadius:20}}>
                           
                           {this.state.bookmarked ?
                           <TouchableOpacity onPress={() => this.setState({bookmarked:false})}>
                            <Image source={require('../Assets/Bookmarked.png')}  style={{width:17,height:21,marginTop:15,marginRight:30,marginLeft:'85%'}}  /> 
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => this.bookmarkon() }>
                    
                           <Image source={require('../Assets/Bookmark.png')}  style={{width:17,height:21,marginTop:15,marginRight:30,marginLeft:'85%'}} />
                              </TouchableOpacity>
                  }
                           </View>
                        
                        
                        </View>
                      </View>
                      </TouchableWithoutFeedback>
                    </Modal>

                    </View>
                     

              : 
              <View style={{backgroundColor:'#6b3064',height:Dimensions.get('window').height}}>
              <Image source={require('../Assets/CoupleBackground.png')}  style={{width:Dimensions.get('window').width,height:300}}/>
              <Text style={{color:'white',fontSize:20,fontFamily:'Roboto-Regular',textAlign:'center',marginTop:100}}>Waiting for your
                    {'\n'}partner to join</Text>

                    <Text style={{fontSize:12,color:'white',textAlign:'center',opacity:0.4,marginTop:100}}>(You can remind your partner to accept the invitation quickly)</Text>
             
               </View>
              }
              </View>



                
                     }  
                     </View> 
        );
    }

}
 
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
    backgroundColor : '#efefef' ,
  },
    form :{
      flex: 1 ,
    },
    bigblue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
      alignItems:'center',
      justifyContent:'center',
    },
    bottomNavigation: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 20,
      height: 56
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center', 
      backgroundColor: 'rgba(0,0,0,0.5)', 
    },

    innerContainer: {
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius : 20,
     
      alignContent:'center',
      justifyContent: 'center' ,
      marginLeft : 30,
      marginRight : 30
    },
  });

  