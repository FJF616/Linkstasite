Object.keys(obj).length === 0 && obj.constructor === Object;

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});



}

checkSub() {
    const { stripe } = this.state;
    base.fetch('stripe', {
        context: this,
        then(data) {
            if (Object.keys(data).length) {
                base.update('subscription', {
                    data: { status: 'pro' },
                    then(err) {
                        if(!err) {
                            console.log('subscription status: pro');
                        }
                    }
                }) 
            }
        }
    })
    if ( stripe ) {
        stripe.hasOwnProperty('proSubscription' ) 
        ? base.post('subscription', {
            data: { status: 'pro' },
            then(err) {
                if(!err) {
                    console.log('subscription status: pro');
                }
            }
        }) 
        : base.post('subscription', {
            data: { status: 'trial' },
            then(err) {
                if(!err) {
                    console.log('subscription status: trial')
                }
            }
        })
    }
}