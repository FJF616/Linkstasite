// Copyright 2017 Google LLC.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict'
import firebase from 'firebase';
document.addEventListener("DOMContentLoaded", function(event) {
    const dropEl = document.getElementById('drop')
    const logEl = document.getElementById('log')
    const templateEl = document.getElementById('template')
    templateEl.remove()
    templateEl.style.display = "block"

    // Set up realtime display of image upload and vision data
    const imagesRef = firebase.database().ref('images')
    function updateEntry(snapshot) {
        const data = snapshot.val()
        let entryEl = document.getElementById(snapshot.key)
        if (!entryEl) {
            entryEl = templateEl.cloneNode(true)
            entryEl.id = snapshot.key
            logEl.insertBefore(entryEl, logEl.firstChild)
        }
        if (data.url) {
            const imgEl = entryEl.querySelector("img")
            imgEl.src = data.url
        }
        const urlEl = entryEl.querySelector(".url")
        urlEl.href = data.url
        urlEl.textContent = data.url
        const labelsEl = entryEl.querySelector(".labels")
        labelsEl.textContent = data.labels
    }
    imagesRef.on('child_added', updateEntry)
    imagesRef.on('child_changed', updateEntry)

    // Set up a drop target to upload images to Cloud Storage
    dropEl.addEventListener('drop', event => {
        event.preventDefault()
        dropEl.classList.remove('green')
        const files = event.dataTransfer.files
        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            const imageRef = imagesRef.push({ seasons: 'greetings' })
            firebase.storage().ref(imageRef.key + file.name.substr(file.name.lastIndexOf('.'))).put(file)
            .then(storageSnapshot => {
                imageRef.update({ url: storageSnapshot.downloadURL, seasons: null })
            })
            .catch(error => {
                console.error(error)
                entryEl.remove()
            })
        }
    })
    dropEl.addEventListener('dragover', event => {
        event.preventDefault()
    })
    dropEl.addEventListener('dragenter', event => {
        event.preventDefault()
        dropEl.classList.add('green')
    })
    dropEl.addEventListener('dragleave', event => {
        event.preventDefault()
        dropEl.classList.remove('green')
    })
})