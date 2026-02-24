// Store images in localStorage for cross-page viewing
function getImages() {
    return JSON.parse(localStorage.getItem('classGalleryImages') || '[]');
}

function setImages(images) {
    localStorage.setItem('classGalleryImages', JSON.stringify(images));
}

const uploadForm = document.getElementById('uploadForm');
const imageUpload = document.getElementById('imageUpload');
const galleryView = document.getElementById('galleryView');
const viewModal = document.getElementById('viewModal');
const modalImg = document.getElementById('modalImg');
const closeModalBtn = document.getElementById('closeModalBtn');

function renderGallery(targetGallery) {
    targetGallery.innerHTML = '';
    const images = getImages();
    images.forEach((src, idx) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = src;
        img.style.cursor = "pointer";
        img.onclick = function() {
            modalImg.src = src;
            viewModal.style.display = "flex";
        };

        galleryItem.appendChild(img);

        // Add delete button
        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.innerHTML = '&times;';
        delBtn.title = 'Delete';
        delBtn.onclick = function() {
            const imgs = getImages();
            imgs.splice(idx, 1);
            setImages(imgs);
            renderGallery(galleryView);
        };
        galleryItem.appendChild(delBtn);

        targetGallery.appendChild(galleryItem);
    });
}

uploadForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const files = imageUpload.files;
    const images = getImages();
    let filesRead = 0;
    if (files.length === 0) {
        renderGallery(galleryView);
        uploadForm.reset();
        return;
    }
    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function(event) {
            images.push(event.target.result);
            filesRead++;
            if (filesRead === files.length) {
                setImages(images);
                renderGallery(galleryView);
                uploadForm.reset();
            }
        }
        reader.readAsDataURL(files[i]);
    }
});

closeModalBtn.onclick = function() {
    viewModal.style.display = "none";
    modalImg.src = "";
};

// Initial render and AOS initialization
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true
    });
    renderGallery(galleryView);
});
function addAnnouncement(){

let input = document.getElementById("announcementInput");
let list = document.getElementById("announcementList");

let text = input.value.trim();

if(text === "") return;

let li = document.createElement("li");
li.textContent = text;

list.appendChild(li);

input.value = "";

}