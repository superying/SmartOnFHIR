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

var ClaimResponseSchema = new mongoose.Schema({
    identifier: [{
        use: String,
        label: String,
        system: String,
        value: String
    }],
    request: {
    },
    ruleset: {
        system: String,
        code: String,
        display: String
    },
    originalRuleset: {
        system: String,
        code: String,
        display: String
    },
    created: Date,
    organization: {
    },
    requestProvider: {
    },
    requestOrganization: {
    },
    outcome: String,
    disposition: String,
    payeeType: {
        system: String,
        code: String,
        display: String
    },
    item: [{
        sequenceLinkId: {
        },
        noteNumber: [{
        }],
        adjudication: [{
            code: {
                system: String,
                code: String,
                display: String
            },
            amount: {
            },
            value: Number,
        }],
        detail: [{
            sequenceLinkId: {
            },
            adjudication: [{
                code: {
                    system: String,
                    code: String,
                    display: String
                },
                amount: {
                },
                value: Number,
            }],
            subDetail: [{
                sequenceLinkId: {
                },
                adjudication: [{
                    code: {
                        system: String,
                        code: String,
                        display: String
                    },
                    amount: {
                    },
                    value: Number,
                }]
            }]
        }]
    }],
    addItem: [{
        sequenceLinkId: [{
        }],
        service: {
            system: String,
            code: String,
            display: String
        },
        fee: {
        },
        noteNumberLinkId: [{
        }],
        adjudication: [{
            code: {
                system: String,
                code: String,
                display: String
            },
            amount: {
            },
            value: Number,
        }],
        detail: [{
            service: {
                system: String,
                code: String,
                display: String
            },
            fee: {
            },
            adjudication: [{
                code: {
                    system: String,
                    code: String,
                    display: String
                },
                amount: {
                },
                value: Number,
            }]
        }]
    }],
    error: [{
        sequenceLinkId: {
        },
        detailSequenceLinkId: {
        },
        subdetailSequenceLinkId: {
        },
        code: {
            system: String,
            code: String,
            display: String
        }
    }],
    totalCost: {
    },
    unallocDeductable: {
    },
    totalBenefit: {
    },
    paymentAdjustment: {
    },
    paymentAdjustmentReason: {
        system: String,
        code: String,
        display: String
    },
    paymentDate: Date,
    paymentAmount: {
    },
    paymentRef: {
        use: String,
        label: String,
        system: String,
        value: String
    },
    reserved: {
        system: String,
        code: String,
        display: String
    },
    form: {
        system: String,
        code: String,
        display: String
    },
    note: [{
        number: {
        },
        fhirType: {
            system: String,
            code: String,
            display: String
        },
        text: String,
    }],
    coverage: [{
        sequence: {
        },
        focal: Boolean,
        coverage: {
        },
        businessArrangement: String,
        relationship: {
            system: String,
            code: String,
            display: String
        },
        preAuthRef: String,
        claimResponse: {
        },
        originalRuleset: {
            system: String,
            code: String,
            display: String
        }
    }]
});

mongoose.model('ClaimResponse', ClaimResponseSchema);
