function playErrorSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        // Spookier sound
        oscillator.frequency.value = 100; 
        oscillator.type = 'sawtooth';
        gainNode.gain.value = 0.2;
        oscillator.start();
        setTimeout(() => oscillator.frequency.value = 50, 200);
        setTimeout(() => oscillator.stop(), 400);
    } catch (e) { console.log('Audio not available'); }
}

async function authenticateUser() {
    const accessCode = document.getElementById('accessCodeInput').value.trim();
    const errorMsg = document.getElementById('loginError');

    if (!accessCode) return;

    try {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessCode: accessCode })
        });
        
        if (!response.ok) throw new Error(`Server Status: ${response.status}`);

        const data = await response.json();

        if (data.success) {
            document.getElementById('landing').classList.add('hidden');
            if (data.role === 'employee') {
                document.getElementById('employee').style.display = 'block';
                updateClock();
                setInterval(updateClock, 1000);
                setTimeout(showInfoModal, 500);
            } else if (data.role === 'sysadmin') {
                document.getElementById('sysadmin').style.display = 'block';
            }
        } else {
            playErrorSound();
            errorMsg.textContent = "⚠️ ACCESS DENIED - WRONG FREQUENCY";
            errorMsg.style.display = 'block';
            setTimeout(() => errorMsg.style.display = 'none', 3000);
        }
    } catch (error) {
        console.error('Auth Error:', error);
        errorMsg.innerHTML = "⚠️ CEREBRO OFFLINE<br><small>Is 'node server.js' running?</small>";
        errorMsg.style.display = 'block';
    }
}

function updateClock() {
    var now = new Date();
    document.getElementById('clock').textContent = '19:8' + (now.getSeconds() % 10) + ' | HAWKINS, IN';
}

function showModal(title, content) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalContent').innerHTML = content;
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('genericModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('genericModal').style.display = 'none';
}

function showInfoModal() {
    var content = '<div style="font-family: \'Courier New\', monospace;">' +
        '<h3 style="color: #c00; border-bottom: 2px solid #c00;">🆘 STRANDED IN THE UPSIDE DOWN</h3>' +
        '<p><strong>MISSION:</strong> The connection to Netflix is broken. The Mind Flayer is blocking the signal.</p>' +
        '<p style="margin-top: 10px;"><strong>HOW TO ESCAPE:</strong></p>' +
        '<ul><li>Find 6 Glitches (Errors) in this cursed desktop.</li>' +
        '<li>Look at <strong>Joyce\'s Wall (Post-it)</strong> for the sequence.</li>' +
        '<li>Radio your friend (The Operator) for the Frequency Codes.</li></ul>' +
        '<p style="text-align: center; margin-top: 15px; color: #fff;">FRIENDS DON\'T LIE.</p></div>';
    
    showModal('INCOMING TRANSMISSION', content);
}

function showDecoy(type) {
    var decoys = {
        // --- NORMAL OFFICE APPS (70%) ---
        calc: { title: 'Calculator', content: '<div style="text-align: center; font-size: 3rem; font-family: monospace;">80085</div><p style="margin-top: 1rem; text-align: center;">Classic.</p>' },
        notepad: { title: 'Notepad', content: '<div style="font-family: monospace;">Shopping List:<br>- Eggos<br>- Batteries<br>- Christmas Lights<br>- Hairspray (for Steve)</div>' },
        solitaire: { title: 'Solitaire', content: '<div style="text-align: center; font-size: 4rem;">🂡 🂢 🂣 🂤</div><p style="text-align: center;">You win! (Or are you just hallucinating?)</p>' },
        mspaint: { title: 'MS Paint', content: '<div style="text-align: center;"><div style="width: 200px; height: 150px; margin: 0 auto; background: white; border: 1px solid black; display:flex; align-items:center; justify-content:center; font-size: 2rem;">🖍️</div><p>Will\'s drawing of the Shadow Monster.</p></div>' },
        music: { title: 'Winamp', content: '♫ Now Playing: Should I Stay or Should I Go<br>Artist: The Clash' },
        email: { title: 'Outlook', content: '<strong>From:</strong> Hawkins Power & Light<br><strong>Subject:</strong> Bill Overdue<br>Please pay immediately.' },
        recycle: { title: 'Recycle Bin', content: 'Contains: <br>- deleted_memories.exe<br>- barb.jpg' },
        photos: { title: 'Photos', content: 'Photos of the Snow Ball \'84.<br>Everyone looks happy.' },
        word: { title: 'Word', content: 'Essay.docx<br><br><em>"The History of Hawkins"</em><br>Cursor blinks...' },
        excel: { title: 'Excel', content: 'Lab_Data.xls<br>#DIV/0! Error<br>Corrupted by magnetic field.' },
        powerpoint: { title: 'PowerPoint', content: 'Slide 1: AV Club Presentation' },
        spotify: { title: 'Spotify', content: 'Playlist: Running Up That Hill (Loop)' },
        discord: { title: 'Discord', content: 'Server: Hellfire Club<br>No new messages.' },
        slack: { title: 'Slack', content: '<strong>#general:</strong> Has anyone seen the cat?' },
        chrome: { title: 'Chrome', content: 'No Internet Connection.<br>Dinosaur Game available.' },
        calendar: { title: 'Calendar', content: '<strong>Nov 6, 1983</strong><br>Will went missing.' },
        tasks: { title: 'To-Do List', content: '- Feed D\'Artagnan<br>- Find Eleven' },
        camera: { title: 'Camera', content: 'Lens cap is on.' },
        files: { title: 'My Documents', content: 'Folder Empty.' },
        terminal: { title: 'Terminal', content: 'C:\\> system_failure' },
        settings: { title: 'Settings', content: 'Brightness: 0%<br>It\'s dark here.' },
        backup: { title: 'Backup', content: 'Last backup: 1983.' },

        // --- STRANGER THINGS APPS (30%) ---
        games: { title: 'Arcade', content: 'Dragon\'s Lair: Out of Order<br>Dig Dug: High Score MADMAX' },
        cerebro: { title: 'Cerebro', content: 'Contacting Suzie...<br>Signal weak.' }
    };
    
    if (decoys[type]) {
        showModal(decoys[type].title, decoys[type].content);
    }
}

/* ERROR FUNCTIONS - THEMED FOR THE GAME */
function showError1() { // 401
    playErrorSound();
    showModal('🔬 HAWKINS LAB', '<div style="color:#c00; font-size:1.5rem; font-weight:bold;">ACCESS DENIED</div><p>Level 4 Security Clearance Required.<br>Stop trying to open the door.</p>');
}
function showError2() { // 404
    playErrorSound();
    showModal('👓 BARB_SEARCH.EXE', '<div style="text-align:center; font-size: 3rem;">🚫</div><strong style="color: #c00;">404 NOT FOUND</strong><p>We looked everywhere. Barb is gone.</p>');
}
function showError3() { // 503
    playErrorSound();
    showModal('📺 NETFLIX', '<div class="spinner"></div><strong style="color: #c00;">SIGNAL INTERFERENCE</strong><p>The Mind Flayer is blocking the bandwidth. System Unavailable.</p>');
}
function showError4() { // 418
    playErrorSound();
    showModal('🧇 EGGO_TOASTER', '<div style="font-size:3rem;">🫖</div><strong>I\'M A TEAPOT</strong><p>I cannot toast these waffles. I am a teapot.</p>');
}
function showError5() { // 403
    playErrorSound();
    showModal('⚡ THE GATE', '<div style="font-size:3rem;">🔒</div><strong style="color: #c00;">FORBIDDEN</strong><p>Eleven closed this gate. You cannot pass.</p>');
}
function showError6() { // 301
    playErrorSound();
    showModal('🧒 WILL BYERS', '<strong style="color: #c00;">MOVED</strong><p>Target is not in this dimension.<br>Redirecting to: The Upside Down.</p>');
}

async function checkCode() {
    const input = document.getElementById('codeInput').value.trim();
    const messageDiv = document.getElementById('codeMessage');

    messageDiv.style.display = 'block';
    messageDiv.textContent = '📡 TUNING FREQUENCY...';
    messageDiv.className = 'code-message';

    try {
        const response = await fetch('/api/check-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: input })
        });
        
        const data = await response.json();

        if (data.success) {
            messageDiv.className = 'code-message code-success';
            messageDiv.textContent = '✓ SIGNAL LOCKED!';
            setTimeout(() => {
                document.getElementById('employee').style.display = 'none';
                document.getElementById('success').style.display = 'block';
                // Trigger confetti (or waffles)
            }, 1500);
        } else {
            playErrorSound();
            messageDiv.className = 'code-message code-error';
            messageDiv.textContent = '✕ STATIC NOISE (Invalid Code)';
            setTimeout(() => messageDiv.style.display = 'none', 4000);
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.textContent = '⚠️ CONNECTION LOST';
    }
}