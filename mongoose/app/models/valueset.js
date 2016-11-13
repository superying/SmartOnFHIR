// Copyright (c) 2011+, HL7, Inc & The MITRE Corporation
// All rights reserved.
// 
// Redistribution and use in source and binary forms, with or without modification, 
// are permitted provided that the following conditions are met:
// 
//     * Redistributions of source code must retain the above copyright notice, this 
//       list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright notice, 
//       this list of conditions and the following disclaimer in the documentation 
//       and/or other materials provided with the distribution.
//     * Neither the name of HL7 nor the names of its contributors may be used to 
//       endorse or promote products derived from this software without specific 
//       prior written permission.
// 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND 
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED 
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
// IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT 
// NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR 
// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, 
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
// POSSIBILITY OF SUCH DAMAGE.

var mongoose = require('mongoose');

var ValueSetSchema = new mongoose.Schema({
    url: String,
    identifier: {
        use: String,
        label: String,
        system: String,
        value: String
    },
    version: String,
    name: String,
    status: String,
    experimental: Boolean,
    publisher: String,
    contact: [{
        name: String,
        telecom: [{
        }]
    }],
    date: Date,
    lockedDate: Date,
    description: String,
    useContext: [{
        coding: [{
            system: String,
            code: String,
            display: String
        }]
    }],
    immutable: Boolean,
    requirements: String,
    copyright: String,
    extensible: Boolean,
    codeSystem: {
        system: String,
        version: String,
        caseSensitive: Boolean,
        concept: [{
            code: String,
            abstract: Boolean,
            display: String,
            definition: String,
            designation: [{
                language: String,
                use: {
                    system: String,
                    code: String,
                    display: String
                },
                value: String,
            }],
            concept: [{
            }]
        }]
    },
    compose: {
        import: String,
        include: [{
            system: String,
            version: String,
            concept: [{
                code: String,
                display: String,
                designation: [{
                }]
            }],
            filter: [{
                property: String,
                op: String,
                value: String,
            }]
        }],
        exclude: [{
        }]
    },
    expansion: {
        identifier: String,
        timestamp: Date,
        total: Number,
        offset: Number,
        parameter: [{
            name: String,
            valueString: String,
            valueBoolean: Boolean,
            valueInteger: Number,
            valueDecimal: Number,
            valueUri: String,
            valueCode: String,
        }],
        contains: [{
            system: String,
            abstract: Boolean,
            version: String,
            code: String,
            display: String,
            contains: [{
            }]
        }]
    }
});

mongoose.model('ValueSet', ValueSetSchema);
