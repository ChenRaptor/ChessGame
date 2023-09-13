class ChessChat 
{

    constructor (modal) 
    {
        this.socket = io.connect(':8090');
        this.activeUsers = false
        this.userListModal = modal;
        
        this.chessInvitationModal = `
            <aside class="chess_invitation">
                <h2>Chess game</h2>
                <h2>Tu a s été invité à un jeu d'echec</h2>
                <div>
                    <button>Accepté</button>
                    <button>Refusé</button>
                </div>
            </aside>
        `
        this.start();
    }

    start()
    {
        socket.on('active_users', (users) =>  
        {
            this.setActiveUsers(users);
            this.injectUser()
        })

        socket.on('chess_invitation', () => this.gotInvited());
    }

    setActiveUsers(users)
    {
        return this.activeUsers = users
    }

    injectUser()
    {
        this.userListModal.innerHTML = (this.activeUsers ?? []).map((user) => user.name ? `
            <li>
                <button>${user.name}</button>
            </li>
        ` : "").join('');

        this.userListModal.querySelectorAll('button').forEach((btn, index) => {
            btn.addEventListener('click', () => 
                socket.emit('chess_game', this.activeUsers[index].id)
            )
        })
    }

    stringAnalyse(string) 
    {
        string.includes('/chess @')
            ? this.userListModal.classList.remove('hide')
            : !this.userListModal.classList.contains('hide') 
                ? this.userListModal.classList.add('hide') 
                : ""
	}

    gotInvited()
    {
        document.body.innerHTML += this.chessInvitationModal;
        // document.querySelectorAll('chess_invitation button').forEach(btn => 
        //     btn.addEventListener('click', () => 
        //         console.log('test');
        //     )    
        // );
        
    }


}