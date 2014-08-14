
	/*wz.social.getAccounts( function( error, list ){

        for( var i = 0; i < list.accounts.length; i++ ){

            wql.getAccount( list.accounts[i].id, function( error, result ){

            	console.log( error, result );

            });

        }

    });*/

	notification

	.on( 'social-twitterTweet', function( event, account, tweet ){

		wql.getType( [ account.id, 0 ], function( error, result ){

			if( result.length ){

				if( tweet.retweeted_status ){

		            wz.banner()
		                .title( tweet.user.name )
		                .text( tweet.retweeted_status.text )
		                .icon( 'https://static.inevio.com/app/3/twitter.png' )
		                .popup( tweet.url, 600, 500 )
		                .render();

		        }else{

		            wz.banner()
		                .title( tweet.user.name )
		                .text( tweet.text )
		                .icon( 'https://static.inevio.com/app/3/twitter.png' )
		                .popup( tweet.url, 600, 500 )
		                .render();

		        }   

			}

		});         

    })

    .on( 'social-twitterMessage', function( event, account, message ){

    	wql.getType( [ account.id, 1 ], function( error, result ){

			if( result.length ){

				wz.banner()
		            .title( lang.twitter.message + ' ' + message.direct_message.sender_screen_name )
		            .text( message.direct_message.text )
		            .icon( 'https://static.inevio.com/app/3/twitter.png' )
		            //.popup( tweet.url, 600, 500 )
		            .render(); 

			}

		}); 

    })

    .on( 'social-twitterReply', function( event, account, reply ){

    	wql.getType( [ account.id, 2 ], function( error, result ){

			if( result.length ){

				wz.banner()
		            .title( reply.user.name + ' ' + lang.twitter.reply )
		            .text( reply.text )
		            .icon( 'https://static.inevio.com/app/3/twitter.png' )
		            .popup( reply.url, 600, 500 )
		            .render();

			}

		});

    })

    .on( 'social-twitterMention', function( event, account, mention ){

    	wql.getType( [ account.id, 3 ], function( error, result ){

			if( result.length ){

				wz.banner()
		            .title( mention.user.name + ' ' + lang.twitter.mention )
		            .text( mention.text )
		            .icon( 'https://static.inevio.com/app/3/twitter.png' )
		            .popup( mention.url, 600, 500 )
		            .render();

			}

		});

    })

    .on( 'social-twitterRetweet', function( event, account, retweet ){

    	wql.getType( [ account.id, 4 ], function( error, result ){

			if( result.length ){

				wz.banner()
		            .title( retweet.user.name + ' ' + lang.twitter.retweet )
		            .text( retweet.retweeted_status.text )
		            .icon( 'https://static.inevio.com/app/3/twitter.png' )
		            .popup( retweet.url, 600, 500 )
		            .render();

			}

		});

    })

    .on( 'social-twitterFavorite', function( event, account, fav ){

    	wql.getType( [ account.id, 5 ], function( error, result ){

			if( result.length ){

				wz.banner()
		            .title( fav.source.name + ' ' + lang.twitter.fav )
		            .text( fav.target_object.text )
		            .icon( 'https://static.inevio.com/app/3/twitter.png' )
		            .popup( fav.url, 600, 500 )
		            .render();

			}

		});

    })

    .on( 'social-twitterUnfavorite', function( event, account, unfav ){

    	wql.getType( [ account.id, 6 ], function( error, result ){

			if( result.length ){

				wz.banner()
		            .title( unfav.source.name + ' ' + lang.twitter.unfav )
		            .text( unfav.target_object.text )
		            .icon( 'https://static.inevio.com/app/3/twitter.png' )
		            .popup( unfav.url, 600, 500 )
		            .render();

			}

		});

    })

    .on( 'social-twitterFollow', function( event, account, follow ){

    	wql.getType( [ account.id, 7 ], function( error, result ){

			if( result.length ){

				wz.banner()
		            .title( lang.twitter.follow )
		            .text( follow.source.name + ' ' + lang.twitter.followMessage )
		            .icon( 'https://static.inevio.com/app/3/twitter.png' )
		            .popup( follow.url, 600, 500 )
		            .render();

			}

		});

    })

    .on( 'social-facebookGroupPost', function( event, account, data ){

    	wql.getType( [ account.id, 5 ], function( error, result ){

			if( result.length ){

				wz.banner()
		            .title( data.group.name )
		            .text( data.user.name + ': ' + data.message )
		            .icon( 'https://static.inevio.com/app/3/facebook.png' )
		            .render();

			}

		});

    })

    .on( 'social-facebookEventCreated', function( event, account, data ){

    	wql.getType( [ account.id, 6 ], function( error, result ){

			if( result.length ){

				wz.banner()
		            .title( lang.facebook.eventCreated )
		            .text( data.user.name + ' ' + lang.facebook.eventCreated + ' ' + data.event.name )
		            .icon( 'https://static.inevio.com/app/3/facebook.png' )
		            .render();

			}

		});

    })

    .on( 'social-facebookStatusUpdated', function( event, account, data ){

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
		            .icon( 'https://static.inevio.com/app/3/facebook.png' )
		            .render();

			}

		});

    })

    .on( 'social-facebookPhotoPosted', function( event, account, data ){

    	wql.getType( [ account.id, 4 ], function( error, result ){

			if( result.length ){

				if( data.message ){
		            var photoPostedText = lang.facebook.photoPostedText1 + ' ' + data.message;
		        }else{
		            var photoPostedText = lang.facebook.photoPostedText2;
		        }

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
		            .title( lang.facebook.photoPosted + ' ' + name )
		            .text( data.user.name + ' ' + photoPostedText )
		            .icon( 'https://static.inevio.com/app/3/facebook.png' )
		            .render();

			}

		});

    })

    .on( 'social-facebookNoteCreated', function( event, account, data ){

    	wql.getType( [ account.id, 7 ], function( error, result ){

			if( result.length ){

				wz.banner()
		            .title( data.user.name + ' ' + lang.facebook.noteCreated )
		            .text( data.user.name + ' ' + lang.facebook.noteCreatedText + ' ' + data.attachment.name )
		            .icon( 'https://static.inevio.com/app/3/facebook.png' )
		            .render();

			}

		});

    })

    .on( 'social-facebookLinkPosted', function( event, account, data ){

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
		            .icon( 'https://static.inevio.com/app/3/facebook.png' )
		            .render();
	            
			}

		});

    })

    .on( 'social-facebookVideoPosted', function( event, account, data ){

    	wql.getType( [ account.id, 7 ], function( error, result ){

			if( result.length ){

				if( data.message ){
		            var videoPostedText = lang.facebook.videoPostedText1 + ' ' + data.message;
		        }else{
		            var videoPostedText = lang.facebook.videoPostedText2;
		        }

		        wz.banner()
		            .title( data.user.name + ' ' + lang.facebook.videoPosted )
		            .text( videoPostedText )
		            .icon( 'https://static.inevio.com/app/3/facebook.png' )
		            .render();

			}

		});

    })

    .on( 'social-facebookMessage', function( event, account, data ){

    	wql.getType( [ account.id, 1 ], function( error, result ){

			if( result.length ){

				wz.banner()
		            .title( lang.facebook.message + ' ' + data.user.name )
		            .text( data.body )
		            .icon( 'https://static.inevio.com/app/3/facebook.png' )
		            .render();

			}

		});

    })

    .on( 'social-facebookFriendRequest', function( event, account, data ){

    	wql.getType( [ account.id, 2 ], function( error, result ){

			if( result.length ){

				wz.banner()
		            .title( lang.facebook.request + ' ' + data.user.name )
		            .text( data.body )
		            .icon( 'https://static.inevio.com/app/3/facebook.png' )
		            .render();

			}

		});

    })

    .on( 'social-facebookNotificationEvent', function( event, account, data ){

    	wql.getType( [ account.id, 6 ], function( error, result ){

			if( result.length ){

				wz.banner()
		            .title( lang.facebook.eventCreated )
		            .text( data.user.name + ' ' + lang.facebook.eventCreated + ' ' + data.event.name )
		            .icon( 'https://static.inevio.com/app/3/facebook.png' )
		            .render();

			}

		});

    })

    .on( 'social-facebookNotificationFriend', function( event, account, data ){

    	wql.getType( [ account.id, 2 ], function( error, result ){

			if( result.length ){

				wz.banner()
		            .title( lang.facebook.requestAccepted )
		            .text( data.user.name + ' ' + lang.facebook.requestAcceptedExplain )
		            .icon( 'https://static.inevio.com/app/3/facebook.png' )
		            .render();

			}

		});

    })

    .on( 'social-facebookNotificationGroup', function( event, account, data ){

    	wql.getType( [ account.id, 5 ], function( error, result ){

			if( result.length ){

				wz.banner()
		            .title( lang.facebook.groupRequest )
		            .text( lang.facebook.groupRequestOne + data.group.name + ' ' + lang.facebook.groupRequestTwo )
		            .icon( 'https://static.inevio.com/app/3/facebook.png' )
		            .render();

			}

		});

    })

    .on( 'social-facebookNotificationPhoto', function( event, account, data ){

    	wql.getType( [ account.id, 0 ], function( error, result ){

			if( result.length ){

				wz.banner()
		            .title( lang.facebook.userTagged )
		            .text( data.user.name + ' ' + lang.facebook.beenTagged )
		            .icon( 'https://static.inevio.com/app/3/facebook.png' )
		            .render();

			}

		});

    });
