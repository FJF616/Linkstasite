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
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as vision from '@google-cloud/vision'
import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs'

admin.initializeApp(functions.config().firebase)

export const upload = functions.storage.object().onChange(event => {
    const object = event.data
    const parts = path.parse(object.name)

    if (object.resourceState !== 'exists') {
        return null
    }

    // Pass the Cloud Storage URL directly to the Cloud Vision API
    const client = new vision.ImageAnnotatorClient();
    const inStorage = `gs://${object.bucket}/${object.name}`
    return client.labelDetection(inStorage)
    .then(results => {
        const labels = results[0].labelAnnotations
        // Update the database with a comma-separated list of labels
        return admin.database().ref(`images/${parts.name}`).update({
            labels: labels.map(label => label.description).join(', ')
        })
    })
    .catch(error => {
        console.error(error);
    })
})