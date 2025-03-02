window.addEventListener("load", (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const compressed = urlParams.get('data');

    if (compressed) {
        try {
            const decoded = LZString.decompressFromBase64(decodeURIComponent(compressed));
            const data = JSON.parse(decoded);
            
            loadUrl(data);
        } catch (e) {
            console.error('Error decompiling link (possible wrong link): ', e);
        }
    } else {
        if (localStorage.getItem('bingo') !== null) {
            generateEmpty();
            loadLocal();
        } else {
            generate();
        }
    }
});

function generate() {
    const bingoContainer = document.querySelector('.bingoContainer');
    const loadingAnimation = document.querySelector('.loadingAnimation');

    const maxLoop = 50;
    let currentLoop = 0;

    const audio = new Audio('./soundeffects/riser.mp3');
    audio.loop = false;
    audio.play().catch(e => {});

    for (let i = 0; i < maxLoop; i++) {
        setTimeout(() => {
            bingoContainer.innerHTML = '';
            const images = getImages();

            images.forEach(image => {
                const img = document.createElement("img");
                img.src = image;
                img.classList.add("bingoImage");
                bingoContainer.appendChild(img);

                if (image == "./images/icon/it_s lights out.png") {
                    img.classList.add('clicked');
                } else {
                    img.addEventListener('click', function() {
                        img.classList.toggle('clicked');
                    });
                }
            });

            bingoContainer.classList.add('unclickable');

            currentLoop++;
            if (currentLoop == maxLoop)
                bingoContainer.classList.toggle('unclickable');
        }, 50 * i)
    }

    loadingAnimation.style.display = "none";
    bingoContainer.style.visibility = "visible";
}

function generateEmpty() {
    const bingoContainer = document.querySelector('.bingoContainer');
    const loadingAnimation = document.querySelector('.loadingAnimation');

    for (let i = 0; i < 25; i++) {
        const img = document.createElement("img");
        img.src = './images/logo.png';
        img.classList.add("bingoImage");
        bingoContainer.appendChild(img);

        if (i !== 12) {
            img.addEventListener('click', function() {
                img.classList.toggle('clicked');
            });
        }
    }

    loadingAnimation.style.display = "none";
    bingoContainer.style.visibility = "visible";
}

function getImages() {
    const images = ["./images/icon/10 place grid drop.png", "./images/icon/10+ second pit stop.png", "./images/icon/3+ red flags.png", "./images/icon/3+ wins in a row.png", "./images/icon/5+ race winners.png", "./images/icon/5+ red flags.png", "./images/icon/5+ second pit stop.png", "./images/icon/5+ virtual safeties.png", "./images/icon/5+ wins in a row.png", "./images/icon/all brit podium.png", "./images/icon/all cars finish.png", "./images/icon/alonso podium.png", "./images/icon/alpine podium.png", "./images/icon/animal on track.png", "./images/icon/antonelli win.png", "./images/icon/awkward cool down.png", "./images/icon/bad fia rules.png", "./images/icon/bad strategy.png", "./images/icon/brit wins british gp.png", "./images/icon/car goes flying.png", "./images/icon/car on fire.png", "./images/icon/celeb sighting.png", "./images/icon/champagne shoey.png", "./images/icon/contract broken.png", "./images/icon/cost cap breach.png", "./images/icon/disqualified.png", "./images/icon/donuts on track.png", "./images/icon/double overtake.png", "./images/icon/double stack pit.png", "./images/icon/drive thru penalty.png", "./images/icon/driver break up.png", "./images/icon/driver gets sick.png", "./images/icon/driver injured.png", "./images/icon/driver rant.png", "./images/icon/driver retirement.png", "./images/icon/emotional radio.png", "./images/icon/engine penalty.png", "./images/icon/f1 movie a success.png", "./images/icon/f1 movie bombs.png", "./images/icon/false start.png", "./images/icon/ferrari 1-2.png", "./images/icon/final race decider.png", "./images/icon/first lap crash.png", "./images/icon/first lap safety.png", "./images/icon/formation lap crash.png", "./images/icon/franco gets seat.png", "./images/icon/frenchman on podium.png", "./images/icon/front row lockout.png", "./images/icon/front wing swap.png", "./images/icon/gets 100_ of points.png", "./images/icon/grand slam.png", "./images/icon/haas points.png", "./images/icon/home race win.png", "./images/icon/hulk_s 1st podium.png", "./images/icon/lando wins from pole.png", "./images/icon/last lap overtake.png", "./images/icon/lewis wins his eigth.png", "./images/icon/liam beats max.png", "./images/icon/max has a baby boy.png", "./images/icon/max has a baby girl.png", "./images/icon/mbs runs his mouth.png", "./images/icon/mclaren 1-2.png", "./images/icon/mercedes 1-2.png", "./images/icon/mid-season rule chage.png", "./images/icon/mid-season swap.png", "./images/icon/monetary fines.png", "./images/icon/multi-car crash.png", "./images/icon/multiple penalties.png", "./images/icon/new champion.png", "./images/icon/new girlfriend.png", "./images/icon/new haircut.png", "./images/icon/new lap record.png", "./images/icon/new meme.png", "./images/icon/new pole sitter.png", "./images/icon/new race winner.png", "./images/icon/off-track drama.png", "./images/icon/orders ignored.png", "./images/icon/oscar is a robot.png", "./images/icon/overweight car.png", "./images/icon/photo finish.png", "./images/icon/pit crew gets hurt.png", "./images/icon/pit lane speeding.png", "./images/icon/pit lane start.png", "./images/icon/pit stop fail.png", "./images/icon/podium from p20.png", "./images/icon/pole loses in monaco.png", "./images/icon/pole wins monaco.png", "./images/icon/porpoising problem.png", "./images/icon/post race penalty.png", "./images/icon/principal replaced.png", "./images/icon/race ban.png", "./images/icon/race cancelled.png", "./images/icon/race lasts 2+ hours.png", "./images/icon/radio karaoke.png", "./images/icon/rain delay.png", "./images/icon/rb points.png", "./images/icon/record broken.png", "./images/icon/red bull 1-2.png", "./images/icon/reserve driver in.png", "./images/icon/rookie points.png", "./images/icon/rookie wins.png", "./images/icon/rosberg curse.png", "./images/icon/safety car finish.png", "./images/icon/sauber points.png", "./images/icon/shock transfer.png", "./images/icon/simply lovely.png", "./images/icon/smooth operator.png", "./images/icon/special podium hat.png", "./images/icon/stop-n-go penalty.png", "./images/icon/stroll beats alo.png", "./images/icon/stroll incident.png", "./images/icon/stuck in gravel.png", "./images/icon/sub 2 sec pit stop.png", "./images/icon/swearing on radio.png", "./images/icon/team dnf.png", "./images/icon/team orders.png", "./images/icon/teammate beef.png", "./images/icon/teammates crash.png", "./images/icon/teammates on podium.png", "./images/icon/tire on track.png", "./images/icon/tire puncture.png", "./images/icon/unsafe release.png", "./images/icon/we are checking.png", "./images/icon/wet qualifying.png", "./images/icon/wet race.png", "./images/icon/williams points.png", "./images/icon/win from below p10.png", "./images/icon/win from pole.png", "./images/icon/wtf silly season.png", "./images/icon/yuki podium.png", "./images/icon/zero pts in 2025.png"];

    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }

    return [...images.slice(0, 12), "./images/icon/it_s lights out.png", ...images.slice(13, 25)];
}

function save() {
    document.querySelector('.saveOptions').style.visibility = "visible";
}

function saveLocal() {
    const btn = document.querySelector('.saveLocal');

    const images = Array.from(document.querySelectorAll('.bingoContainer img'))
        .map(img => [img.src.split('/').pop(), img.classList.contains('clicked')]);

    localStorage.setItem('bingo', JSON.stringify(images));

    btn.classList.add('btnSuccess');
    btn.innerHTML = "SAVED TO LOCAL STORAGE!";

    const audio = new Audio('./soundeffects/saved.wav');
    audio.loop = false;
    audio.play();

    setTimeout(() => {
        btn.classList.remove('btnSuccess');
        btn.innerHTML = "SAVE TO LOCAL STORAGE";
    }, 1000)
}

function saveCopy() {
    const btn = document.querySelector('.saveCopy');

    const images = Array.from(document.querySelectorAll('.bingoContainer img'))
        .map(img => [img.src.split('/').pop(), img.classList.contains('clicked')]);

    navigator.clipboard.writeText(JSON.stringify(images))
        .then(() => {
            btn.classList.add('btnSuccess');
            btn.innerHTML = "COPIED TO CLIPBOARD!";

            const audio = new Audio('./soundeffects/saved.wav');
            audio.loop = false;
            audio.play();

            setTimeout(() => {
                btn.classList.remove('btnSuccess');
                btn.innerHTML = "COPY AS TEXT";
            }, 1000)
        })
        .catch(err => {
            btn.classList.add('btnFailed');
            btn.innerHTML = "FAILED TO COPY TO CLIPBOARD";

            setTimeout(() => {
                btn.classList.remove('btnFailed');
                btn.innerHTML = "COPY AS TEXT";
            }, 1000)
        });
}

function saveFile() {
    const images = Array.from(document.querySelectorAll('.bingoContainer img'))
        .map(img => [img.src.split('/').pop(), img.classList.contains('clicked')]);

    const blob = new Blob([JSON.stringify(images)], { type: 'text/plain' });

    const audio = new Audio('./soundeffects/saved.wav');
    audio.loop = false;
    audio.play();

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "bingo.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function closeSave() {
    document.querySelector('.saveOptions').style.visibility = "hidden";
}

function load() {
    document.querySelector('#input').value = '';

    document.querySelector('.loadOptions').style.visibility = "visible";
}

function loadUrl(data) {
    const bingoContainer = document.querySelector('.bingoContainer');
    const loadingAnimation = document.querySelector('.loadingAnimation');

    for (let i = 0; i < 25; i++) {
        const img = document.createElement("img");
        img.src = `./images/icon/${data[i][0]}`;
        img.classList.add("bingoImage");
        bingoContainer.appendChild(img);

        if (data[i][1])
            img.classList.add('clicked');

        if (i == 12) {
            img.classList.add('clicked');
        } else {
            img.addEventListener('click', function() {
                img.classList.toggle('clicked');
            });
        }
    }

    loadingAnimation.style.display = "none";
    bingoContainer.style.visibility = "visible";
}

function loadLocal() {
    var data = '';

    try {
        data = JSON.parse(localStorage.getItem('bingo'));
    } catch (err) {
        const audio = new Audio('./soundeffects/error.wav');
        audio.loop = false;
        audio.play();

        console.error(err);
    }

    const bingoContainer = document.querySelector('.bingoContainer')
    for (let i = 0; i < bingoContainer.children.length; i++) {
        const img = bingoContainer.children[i];
        img.src = `./images/icon/${data[i][0]}`;
        if (data[i][1])
            img.classList.add('clicked');
    }

    const audio = new Audio('./soundeffects/saved.wav');
    audio.loop = false;
    audio.play().catch(e => {});

    closeLoad();
}

function loadCopy() {
    navigator.clipboard.readText()
        .then(text => {
            const data = JSON.parse(text);

            const bingoContainer = document.querySelector('.bingoContainer')
            for (let i = 0; i < bingoContainer.children.length; i++) {
                const img = bingoContainer.children[i];
                img.src = `./images/icon/${data[i][0]}`;
                if (data[i][1])
                    img.classList.add('clicked');
            }

            const audio = new Audio('./soundeffects/saved.wav');
            audio.loop = false;
            audio.play();
        })
        .catch(err => {
            const audio = new Audio('./soundeffects/error.wav');
            audio.loop = false;
            audio.play();

            console.log(err);
        });

    closeLoad();
}

document.querySelector('#input').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        var data = '';

        try {
            data = JSON.parse(reader.result);
        } catch (err) {
            const audio = new Audio('./soundeffects/error.wav');
            audio.loop = false;
            audio.play();

            console.log(err);
        }
        loadFile(data);
    };
    reader.readAsText(file);
});

function loadFile(data) {
    const bingoContainer = document.querySelector('.bingoContainer')
    for (let i = 0; i < bingoContainer.children.length; i++) {
        const img = bingoContainer.children[i];
        img.src = `./images/icon/${data[i][0]}`;
        if (data[i][1])
            img.classList.add('clicked');
    }

    const audio = new Audio('./soundeffects/saved.wav');
    audio.loop = false;
    audio.play();

    closeLoad();
}

function closeLoad() {
    document.querySelector('.loadOptions').style.visibility = "hidden";
}

async function status() {
    document.querySelector('.status').style.visibility = "visible";

    const response = await fetch("https://api.github.com/gists/200a7bf9feb52bf7b9707ea31ecb083e");
    const gist = await response.json();
    const gistResponse = await fetch(gist.files["f1bingo.json"].raw_url);
    const data = await gistResponse.json();

    const statusContainer = document.querySelector('.statusContainer');
    statusContainer.innerHTML = "";

    for (const card in data) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('statusItem');

        const img = document.createElement('img');
        img.src = `./images/icon/${card}`;

        if (data[card] === null) {
            wrapper.classList.add('gray');
        }

        if (data[card] === false) {
            wrapper.classList.add('red');
        }

        if (data[card] === true) {
            wrapper.classList.add('green');
        }

        wrapper.appendChild(img);
        statusContainer.appendChild(wrapper);
    }
}

function closeStatus() {
    document.querySelector('.status').style.visibility = "hidden";
}

function share() {
    const btn = document.querySelector('.saveLink');

    const images = Array.from(document.querySelectorAll('.bingoContainer img'))
        .map(img => [img.src.split('/').pop(), img.classList.contains('clicked')]);

    const data = JSON.stringify(images);
    const compressed = LZString.compressToBase64(data);

    const url = `${window.location.href.split('?')[0]}?data=${encodeURIComponent(compressed)}`;

    navigator.clipboard.writeText(url)
    .then(() => {
        btn.classList.add('btnSuccess');
        btn.innerHTML = "COPIED TO CLIPBOARD!";

        const audio = new Audio('./soundeffects/saved.wav');
        audio.loop = false;
        audio.play();

        setTimeout(() => {
            btn.classList.remove('btnSuccess');
            btn.innerHTML = "COPY AS LINK";
        }, 1000)
    })
    .catch(err => {
        btn.classList.add('btnFailed');
        btn.innerHTML = "FAILED TO COPY TO CLIPBOARD";

        setTimeout(() => {
            btn.classList.remove('btnFailed');
            btn.innerHTML = "COPY AS LINK";
        }, 1000)
    });
}