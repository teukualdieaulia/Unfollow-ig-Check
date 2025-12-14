if (window.location.origin !== "https://www.instagram.com") {
  window.alert(
    "Hei! Kamu harus berada di situs Instagram sebelum menjalankan kode ini. Aku akan membawamu ke sana sekarang, tapi kamu harus menjalankan ulang kode ini di console.",
  );
  window.location.href = "https://www.instagram.com";
  console.clear();
}

const fetchOptions = {
  credentials: "include",
  headers: {
    "X-IG-App-ID": "936619743392459",
  },
  method: "GET",
};

let username;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

// Fungsi ini menangani seluruh logika pagination
// Memanggil API secara rekursif sampai tidak ada halaman lagi yang bisa dimuat
const concatFriendshipsApiResponse = async (
  list,
  user_id,
  count,
  next_max_id = "",
) => {
  let url = `https://www.instagram.com/api/v1/friendships/${user_id}/${list}/?count=${count}`;
  if (next_max_id) {
    url += `&max_id=${next_max_id}`;
  }

  const data = await fetch(url, fetchOptions).then((r) => r.json());

  if (data.next_max_id) {
    const timeToSleep = random(800, 1500);
    console.log(
      `Berhasil memuat ${data.users.length} ${list}. Jeda ${timeToSleep}ms untuk menghindari pembatasan (rate limit)`,
    );

    await sleep(timeToSleep);

    return data.users.concat(
      await concatFriendshipsApiResponse(
        list,
        user_id,
        count,
        data.next_max_id,
      ),
    );
  }

  return data.users;
};

// Method bantuan agar kode lebih mudah dibaca
const getFollowers = (user_id, count = 50, next_max_id = "") => {
  return concatFriendshipsApiResponse("followers", user_id, count, next_max_id);
};

const getFollowing = (user_id, count = 50, next_max_id = "") => {
  return concatFriendshipsApiResponse("following", user_id, count, next_max_id);
};

const getUserId = async (username) => {
  let user = username;

  const lower = user.toLowerCase();
  const url = `https://www.instagram.com/api/v1/web/search/topsearch/?context=blended&query=${lower}&include_reel=false`;
  const data = await fetch(url, fetchOptions).then((r) => r.json());

  const result = data.users?.find(
    (result) => result.user.username.toLowerCase() === lower,
  );

  return result?.user?.pk || null;
};

const getUserFriendshipStats = async (username) => {
  const user_id = await getUserId(username);

  if (!user_id) {
    throw new Error(`Tidak dapat menemukan pengguna dengan username ${username}`);
  }

  const followers = await getFollowers(user_id);
  const following = await getFollowing(user_id);

  const followersUsernames = followers.map((follower) =>
    follower.username.toLowerCase(),
  );
  const followingUsernames = following.map((followed) =>
    followed.username.toLowerCase(),
  );

  const followerSet = new Set(followersUsernames);
  const followingSet = new Set(followingUsernames);

  console.log(Array(28).fill("-").join(""));
  console.log(
    `Berhasil mengambil`,
    followerSet.size,
    "pengikut dan",
    followingSet.size,
    "yang diikuti.",
  );

  console.log(
    `Jika jumlahnya terasa tidak sesuai, maka sebagian hasil mungkin kurang akurat`,
  );

  const PeopleIDontFollowBack = Array.from(followerSet).filter(
    (follower) => !followingSet.has(follower),
  );

  const PeopleNotFollowingMeBack = Array.from(followingSet).filter(
    (following) => !followerSet.has(following),
  );

  return {
    PeopleIDontFollowBack,     // Orang yang mengikuti saya tapi tidak saya ikuti balik
    PeopleNotFollowingMeBack, // Orang yang saya ikuti tapi tidak mengikuti saya balik
  };
};

// Pastikan tanda kutip tidak dihapus
// Ganti "example_username" di bawah dengan username Instagram kamu
//
// Ubah ini:
username = "example_username";
//
//
getUserFriendshipStats(username).then(console.log);
