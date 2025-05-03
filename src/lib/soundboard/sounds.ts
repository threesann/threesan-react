
// Define the type for SoundboardSounds
export interface SoundboardSound {
    title: string;
    file: string;
}

// Define the type for KevsterSongs
export interface KevsterSong {
    title: string;
    file: string;
    description: string;
}

export interface OtherSong {
    title: string;
    file: string;
    description: string;
}


const SoundboardSounds = [
    {
        title: "pack it in",
        file: "/soundboard/v_pack_it_in.wav",
    },
    {
        title: "come on dj",
        file: "/soundboard/v_come_on_dj.wav",
    },
    {
        title: "kevster clicker",
        file: "/soundboard/v_kevster_clicker.wav",
    },
    {
        title: "kevster gojo",
        file: "/soundboard/v_kevster_gojo.wav",
    },
    {
        title: "make way",
        file: "/soundboard/v_make_way_for_the_emperor.wav",
    },
    {
        title: "mobile phone club",
        file: "/soundboard/v_mobile_phone_club.wav",
    },
    {
        title: "no",
        file: "/soundboard/v_no.wav",
    },
    {
        title: "put that phone away",
        file: "/soundboard/v_put_that_phone_away.wav",
    },
    {
        title: "switch it off",
        file: "/soundboard/v_switch_it_off.wav",
    },
]

const KevsterSongs = [
    {
        title: "Main Theme",
        file: "/soundboard/s_kc_backing.mp3",
        description: "The main theme of Kevster Clicker, made as a joke."
    },
    {
        title: "The Ballad of Kevin Collins",
        file: "/soundboard/s_kc_ballad copy.wav",
        description: "The first song I ever made for Kevster Clicker. Also the first song I ever made. I didn't know how to use the Metronome"
    },
    {
        title: "CLUB BANGER 3024",
        file: "/soundboard/s_kc_banger.wav",
        description: "The second song I made for Kevster Clicker. Intended as another joke song, recounting the 'lore' of the game's creation."
    },
    {
        title: "kevster vs THE CARTEL (+ pirates)",
        file: "/soundboard/s_kc_cartel.wav",
        description: "The third song I made for Kevster Clicker. Intended to parallel The Ballad, the first part really bangs, but the second part has really shitty mixing. It also samples the Taco Bell bong"
    },
    {
        title: "THE END OF KEVIN COLLINS",
        file: "/soundboard/s_kc_theend.wav",
        description: "The last song I made for Kevster Clicker. Though never implemented into the game, it was intended to play during a 'bad ending' cutscene."
    },
]

const OtherSongs = [
    {
        title: "CLOWNHELL",
        file: "/soundboard/s_clownhell.mp3",
        description: "A tiny tune I made to experiment in 3/4 time signature. Clowns were on the mind"
    },
    {
        title: "christmas",
        file: "/soundboard/s_christmas.wav",
        description: "A song I made for the Chat It In Christmas Event 2024. It played on loop endlessly for all users of the website."
    },
    {
        title: "hugew",
        file: "/soundboard/s_hugew.wav",
        description: "More of a sound effect than a song, this is the sound that plays when you win a game of Spin It In."
    },
    {
        title: "kev megami tensei",
        file: "/soundboard/s_kev_megami_tensei.wav",
        description: "A song I made to try and replicate a similar sound to the songs in the early Shin Megami Tensei games. Not perfect!!"
    },
    
    
    
]

export { SoundboardSounds, KevsterSongs, OtherSongs };