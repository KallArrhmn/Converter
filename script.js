document.getElementById('converter-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const url = document.getElementById('url').value;
    const format = document.getElementById('format').value;
    const platform = document.getElementById('platform').value;
    const resultDiv = document.getElementById('result');
    const progressDiv = document.getElementById('progress');

    // Validasi URL
    const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be|tiktok\.com|instagram\.com)\/.+$/;
    if (!urlPattern.test(url)) {
        resultDiv.innerHTML = '<p style="color: red;">URL tidak valid. Silakan masukkan URL yang benar.</p>';
        return;
    }

    resultDiv.innerHTML = '';
    progressDiv.classList.remove('hidden');
    progressDiv.innerHTML = `<p>Konversi ${url} ke format ${format} sedang diproses...</p>`;

    // Simulasi proses konversi
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressDiv.innerHTML = `<p>Proses konversi: ${progress}%</p>`;
        if (progress >= 100) {
            clearInterval(interval);
            // Simulasi URL unduhan
            const downloadUrl = `https://mywebsite.com/download/${platform}/${format}/video.${format}`;
            resultDiv.innerHTML = `<p>Berhasil mengonversi! <a href="${downloadUrl}" download="video.${format}">Klik di sini untuk menyimpan ke galeri</a></p>`;
            progressDiv.classList.add('hidden');

            // Otomatis mengunduh setelah 1 detik
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = downloadUrl; // URL unduhan yang valid
                link.download = `video.${format}`; // Nama file yang akan diunduh
                document.body.appendChild(link);
                link.click(); // Memicu klik untuk mengunduh
                document.body.removeChild(link); // Menghapus elemen link setelah klik
            }, 1000);
        }
    }, 200);
});