
    // To Do -> No se pueden cachear los permisos?

    wz.social
    .on( 'twitterTweet', function( account, tweet ){

        wql.getType( [ account.id, 0 ], function( error, result ){

            if( result.length ){

                if( tweet.retweeted_status ){

                    wz.banner()
                        .setTitle( tweet.user.name )
                        .setText( tweet.retweeted_status.text )
                        .setIcon( 'https://static.inevio.com/app/3/twitter.png' )
                        .on( 'click', function(){
                            wz.popup( tweet.url, 600, 500 );
                        })
                        .render();

                }else{

                    wz.banner()
                        .setTitle( tweet.user.name )
                        .setText( tweet.text )
                        .setIcon( 'https://static.inevio.com/app/3/twitter.png' )
                        .on( 'click', function(){
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
                    .setTitle( lang.twitter.message + ' ' + message.direct_message.sender_screen_name )
                    .setText( message.direct_message.text )
                    .setIcon( 'https://static.inevio.com/app/3/twitter.png' )
                    /*.on( 'click', function(){
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
                    .setTitle( reply.user.name + ' ' + lang.twitter.reply )
                    .setText( reply.text )
                    .setIcon( 'https://static.inevio.com/app/3/twitter.png' )
                    .on( 'click', function(){
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
                    .setTitle( mention.user.name + ' ' + lang.twitter.mention )
                    .setText( mention.text )
                    .setIcon( 'https://static.inevio.com/app/3/twitter.png' )
                    .on( 'click', function(){
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
                    .setTitle( retweet.user.name + ' ' + lang.twitter.retweet )
                    .setText( retweet.retweeted_status.text )
                    .setIcon( 'https://static.inevio.com/app/3/twitter.png' )
                    .on( 'click', function(){
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
                    .setTitle( fav.source.name + ' ' + lang.twitter.fav )
                    .setText( fav.target_object.text )
                    .setIcon( 'https://static.inevio.com/app/3/twitter.png' )
                    .on( 'click', function(){
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
                    .setTitle( unfav.source.name + ' ' + lang.twitter.unfav )
                    .setText( unfav.target_object.text )
                    .setIcon( 'https://static.inevio.com/app/3/twitter.png' )
                    .on( 'click', function(){
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
                    .setTitle( lang.twitter.follow )
                    .setText( follow.source.name + ' ' + lang.twitter.followMessage )
                    .setIcon( 'https://static.inevio.com/app/3/twitter.png' )
                    .on( 'click', function(){
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
                    .setTitle( data.group.name )
                    .setText( data.user.name + ': ' + data.message )
                    .setIcon( 'https://static.inevio.com/app/3/facebook.png' )
                    .render();

            }

        });

    })

    .on( 'facebookEventCreated', function( account, data ){

        wql.getType( [ account.id, 6 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .setTitle( lang.facebook.eventCreated )
                    .setText( data.user.name + ' ' + lang.facebook.eventCreated + ' ' + data.event.name )
                    .setIcon( 'https://static.inevio.com/app/3/facebook.png' )
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
                    .setTitle( name + ' ' + lang.facebook.statusUpdated )
                    .setText( data.message )
                    .setIcon( 'https://static.inevio.com/app/3/facebook.png' )
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
                    .setTitle( lang.facebook.photoPosted + ' ' + name )
                    .setText( data.user.name + ' ' + photoPostedText )
                    .setIcon( 'https://static.inevio.com/app/3/facebook.png' )
                    .render();

            }

        });

    })

    .on( 'facebookNoteCreated', function( account, data ){

        wql.getType( [ account.id, 7 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .setTitle( data.user.name + ' ' + lang.facebook.noteCreated )
                    .setText( data.user.name + ' ' + lang.facebook.noteCreatedText + ' ' + data.attachment.name )
                    .setIcon( 'https://static.inevio.com/app/3/facebook.png' )
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
                    .setTitle( lang.facebook.linkPosted + ' ' + name )
                    .setText( data.attachment.description )
                    .setIcon( 'https://static.weezeel.com/app/3/facebook.png' )
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
                    .setTitle( data.user.name + ' ' + lang.facebook.videoPosted )
                    .setText( videoPostedText )
                    .setIcon( 'https://static.inevio.com/app/3/facebook.png' )
                    .render();

            }

        });

    })

    .on( 'facebookMessage', function( account, data ){

        wql.getType( [ account.id, 1 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .setTitle( lang.facebook.message + ' ' + data.user.name )
                    .setText( data.body )
                    .setIcon( 'https://static.inevio.com/app/3/facebook.png' )
                    .render();

            }

        });

    })

    .on( 'facebookFriendRequest', function( account, data ){

        wql.getType( [ account.id, 2 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .setTitle( lang.facebook.request + ' ' + data.user.name )
                    .setText( data.body )
                    .setIcon( 'https://static.inevio.com/app/3/facebook.png' )
                    .render();

            }

        });

    })

    .on( 'facebookNotificationEvent', function( account, data ){

        wql.getType( [ account.id, 6 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .setTitle( lang.facebook.eventCreated )
                    .setText( data.user.name + ' ' + lang.facebook.eventCreated + ' ' + data.event.name )
                    .setIcon( 'https://static.inevio.com/app/3/facebook.png' )
                    .render();

            }

        });

    })

    .on( 'facebookNotificationFriend', function( account, data ){

        wql.getType( [ account.id, 2 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .setTitle( lang.facebook.requestAccepted )
                    .setText( data.user.name + ' ' + lang.facebook.requestAcceptedExplain )
                    .setIcon( 'https://static.inevio.com/app/3/facebook.png' )
                    .render();

            }

        });

    })

    .on( 'facebookNotificationGroup', function( account, data ){

        wql.getType( [ account.id, 5 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .setTitle( lang.facebook.groupRequest )
                    .setText( lang.facebook.groupRequestOne + data.group.name + ' ' + lang.facebook.groupRequestTwo )
                    .setIcon( 'https://static.inevio.com/app/3/facebook.png' )
                    .render();

            }

        });

    })

    .on( 'facebookNotificationPhoto', function( account, data ){

        wql.getType( [ account.id, 0 ], function( error, result ){

            if( result.length ){

                wz.banner()
                    .setTitle( lang.facebook.userTagged )
                    .setText( data.user.name + ' ' + lang.facebook.beenTagged )
                    .setIcon( 'https://static.inevio.com/app/3/facebook.png' )
                    .render();

            }

        });

    });
