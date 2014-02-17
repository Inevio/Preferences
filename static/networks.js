
    // To Do -> No se pueden cachear los permisos?

    notification
    .on( 'twitterTweet', function( account, tweet ){

        wql.getType( [ account.id, 0 ], function( error, result ){

            if( result.length ){

                if( tweet.retweeted_status ){

                    wz.banner()
                        .title( tweet.user.name )
                        .text( tweet.retweeted_status.text )
                        .icon( 'https://static.weezeel.com/app/3/twitter.png' )
                        .action( function(){
                            wz.popup( tweet.url, 600, 500 );
                        })
                        .render();

                }else{

                    wz.banner()
                        .title( tweet.user.name )
                        .text( tweet.text )
                        .icon( 'https://static.weezeel.com/app/3/twitter.png' )
                        .action( function(){
                            wz.popup( tweet.url, 600, 500 );
                        })
                        .render();

                }

            }

        });

    })

    .on( 'twitterMessage', function( account, message ){

        wql.getType( [ account.id, 1 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .title( lang.twitter.message + ' ' + message.direct_message.sender_screen_name )
                    .text( message.direct_message.text )
                    .icon( 'https://static.weezeel.com/app/3/twitter.png' )
                    /*.action( function(){
                        wz.popup( tweet.url, 600, 500 ); // To Do -> Debería abrirse algo
                    })*/
                    .render();

            }

        });

    })

    .on( 'twitterReply', function( account, reply ){

        wql.getType( [ account.id, 2 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .title( reply.user.name + ' ' + lang.twitter.reply )
                    .text( reply.text )
                    .icon( 'https://static.weezeel.com/app/3/twitter.png' )
                    .action( function(){
                        wz.popup( reply.url, 600, 500 );
                    })
                    .render();

            }

        });

    })

    .on( 'twitterMention', function( account, mention ){

        wql.getType( [ account.id, 3 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .title( mention.user.name + ' ' + lang.twitter.mention )
                    .text( mention.text )
                    .icon( 'https://static.weezeel.com/app/3/twitter.png' )
                    .action( function(){
                        wz.popup( mention.url, 600, 500 );
                    })
                    .render();

            }

        });

    })

    .on( 'twitterRetweet', function( account, retweet ){

        wql.getType( [ account.id, 4 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .title( retweet.user.name + ' ' + lang.twitter.retweet )
                    .text( retweet.retweeted_status.text )
                    .icon( 'https://static.weezeel.com/app/3/twitter.png' )
                    .action( function(){
                        wz.popup( retweet.url, 600, 500 );
                    })
                    .render();

            }

        });

    })

    .on( 'twitterFavorite', function( account, fav ){

        wql.getType( [ account.id, 5 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .title( fav.source.name + ' ' + lang.twitter.fav )
                    .text( fav.target_object.text )
                    .icon( 'https://static.weezeel.com/app/3/twitter.png' )
                    .action( function(){
                        wz.popup( fav.url, 600, 500 );
                    })
                    .render();

            }

        });

    })

    .on( 'twitterUnfavorite', function( account, unfav ){

        wql.getType( [ account.id, 6 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .title( unfav.source.name + ' ' + lang.twitter.unfav )
                    .text( unfav.target_object.text )
                    .icon( 'https://static.weezeel.com/app/3/twitter.png' )
                    .action( function(){
                        wz.popup( unfav.url, 600, 500 );
                    })
                    .render();

            }

        });

    })

    .on( 'twitterFollow', function( account, follow ){

        wql.getType( [ account.id, 7 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .title( lang.twitter.follow )
                    .text( follow.source.name + ' ' + lang.twitter.followMessage )
                    .icon( 'https://static.weezeel.com/app/3/twitter.png' )
                    .action( function(){
                        wz.popup( follow.url, 600, 500 );
                    })
                    .render();

            }

        });

    })

    .on( 'facebookGroupPost', function( account, data ){

        wql.getType( [ account.id, 5 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .title( data.group.name )
                    .text( data.user.name + ': ' + data.message )
                    .icon( 'https://static.weezeel.com/app/3/facebook.png' )
                    .render();

            }

        });

    })

    .on( 'facebookEventCreated', function( account, data ){

        wql.getType( [ account.id, 6 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .title( lang.facebook.eventCreated )
                    .text( data.user.name + ' ' + lang.facebook.eventCreated + ' ' + data.event.name )
                    .icon( 'https://static.weezeel.com/app/3/facebook.png' )
                    .render();

            }

        });

    })

    .on( 'facebookStatusUpdated', function( account, data ){

        wql.getType( [ account.id, 3 ], function( error, result ){

            if( result.length ){

                var name = '';

                if( data.user ){
                    name = data.user.name;
                }else if( data.page ){
                    name = data.page.name;
                }else if( data.group ){
                    name = data.group.name;
                }else if( data.event ){
                    name = data.event.name;
                }

                wz.banner()
                    .title( name + ' ' + lang.facebook.statusUpdated )
                    .text( data.message )
                    .icon( 'https://static.weezeel.com/app/3/facebook.png' )
                    .render();

            }

        });

    })

    .on( 'facebookPhotoPosted', function( account, data ){

        wql.getType( [ account.id, 4 ], function( error, result ){

            if( result.length ){

                var name            = '';
                var photoPostedText = '';

                if( data.message ){
                    photoPostedText = lang.facebook.photoPostedText1 + ' ' + data.message;
                }else{
                    photoPostedText = lang.facebook.photoPostedText2;
                }

                if( data.user ){
                    name = data.user.name;
                }else if( data.page ){
                    name = data.page.name;
                }else if( data.group ){
                    name = data.group.name;
                }else if( data.event ){
                    name = data.event.name;
                }

                wz.banner()
                    .title( lang.facebook.photoPosted + ' ' + name )
                    .text( data.user.name + ' ' + photoPostedText )
                    .icon( 'https://static.weezeel.com/app/3/facebook.png' )
                    .render();

            }

        });

    })

    .on( 'facebookNoteCreated', function( account, data ){

        wql.getType( [ account.id, 7 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .title( data.user.name + ' ' + lang.facebook.noteCreated )
                    .text( data.user.name + ' ' + lang.facebook.noteCreatedText + ' ' + data.attachment.name )
                    .icon( 'https://static.weezeel.com/app/3/facebook.png' )
                    .render();

            }

        });

    })

    .on( 'facebookLinkPosted', function( account, data ){

        wql.getType( [ account.id, 7 ], function( error, result ){

            if( result.length ){

                var name = '';

                if( data.user ){
                    name = data.user.name;
                }else if( data.page ){
                    name = data.page.name;
                }else if( data.group ){
                    name = data.group.name;
                }else if( data.event ){
                    name = data.event.name;
                }

                wz.banner()
                    .title( lang.facebook.linkPosted + ' ' + name )
                    .text( data.attachment.description )
                    .icon( 'https://static.weezeel.com/app/3/facebook.png' )
                    .render();
                
            }

        });

    })

    .on( 'facebookVideoPosted', function( account, data ){

        wql.getType( [ account.id, 7 ], function( error, result ){

            if( result.length ){

                var videoPostedText = '';

                if( data.message ){
                    videoPostedText = lang.facebook.videoPostedText1 + ' ' + data.message;
                }else{
                    videoPostedText = lang.facebook.videoPostedText2;
                }

                wz.banner()
                    .title( data.user.name + ' ' + lang.facebook.videoPosted )
                    .text( videoPostedText )
                    .icon( 'https://static.weezeel.com/app/3/facebook.png' )
                    .render();

            }

        });

    })

    .on( 'facebookMessage', function( account, data ){

        wql.getType( [ account.id, 1 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .title( lang.facebook.message + ' ' + data.user.name )
                    .text( data.body )
                    .icon( 'https://static.weezeel.com/app/3/facebook.png' )
                    .render();

            }

        });

    })

    .on( 'facebookFriendRequest', function( account, data ){

        wql.getType( [ account.id, 2 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .title( lang.facebook.request + ' ' + data.user.name )
                    .text( data.body )
                    .icon( 'https://static.weezeel.com/app/3/facebook.png' )
                    .render();

            }

        });

    })

    .on( 'facebookNotificationEvent', function( account, data ){

        wql.getType( [ account.id, 6 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .title( lang.facebook.eventCreated )
                    .text( data.user.name + ' ' + lang.facebook.eventCreated + ' ' + data.event.name )
                    .icon( 'https://static.weezeel.com/app/3/facebook.png' )
                    .render();

            }

        });

    })

    .on( 'facebookNotificationFriend', function( account, data ){

        wql.getType( [ account.id, 2 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .title( lang.facebook.requestAccepted )
                    .text( data.user.name + ' ' + lang.facebook.requestAcceptedExplain )
                    .icon( 'https://static.weezeel.com/app/3/facebook.png' )
                    .render();

            }

        });

    })

    .on( 'facebookNotificationGroup', function( account, data ){

        wql.getType( [ account.id, 5 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .title( lang.facebook.groupRequest )
                    .text( lang.facebook.groupRequestOne + data.group.name + ' ' + lang.facebook.groupRequestTwo )
                    .icon( 'https://static.weezeel.com/app/3/facebook.png' )
                    .render();

            }

        });

    })

    .on( 'facebookNotificationPhoto', function( account, data ){

        wql.getType( [ account.id, 0 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .title( lang.facebook.userTagged )
                    .text( data.user.name + ' ' + lang.facebook.beenTagged )
                    .icon( 'https://static.weezeel.com/app/3/facebook.png' )
                    .render();

            }

        });

    });
