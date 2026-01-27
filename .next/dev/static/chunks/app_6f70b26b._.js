(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/SplashScreen.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SplashScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function SplashScreen({ onComplete, duration = 3000 }) {
    _s();
    const [fadeOut, setFadeOut] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SplashScreen.useEffect": ()=>{
            const fadeTimer = setTimeout({
                "SplashScreen.useEffect.fadeTimer": ()=>{
                    setFadeOut(true);
                }
            }["SplashScreen.useEffect.fadeTimer"], duration - 500);
            const completeTimer = setTimeout({
                "SplashScreen.useEffect.completeTimer": ()=>{
                    onComplete();
                }
            }["SplashScreen.useEffect.completeTimer"], duration);
            return ({
                "SplashScreen.useEffect": ()=>{
                    clearTimeout(fadeTimer);
                    clearTimeout(completeTimer);
                }
            })["SplashScreen.useEffect"];
        }
    }["SplashScreen.useEffect"], [
        duration,
        onComplete
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`,
        style: {
            background: 'linear-gradient(135deg, #0a1929 0%, #102a43 50%, #1a3352 100%)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-mesh opacity-30"
            }, void 0, false, {
                fileName: "[project]/app/components/SplashScreen.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-radial"
            }, void 0, false, {
                fileName: "[project]/app/components/SplashScreen.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 overflow-hidden opacity-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "absolute bottom-0 left-0 w-full h-48",
                    viewBox: "0 0 400 100",
                    preserveAspectRatio: "none",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M0,80 Q50,70 100,60 T200,50 T300,40 T400,30",
                            fill: "none",
                            stroke: "#d4a853",
                            strokeWidth: "1",
                            className: "animate-chart-draw",
                            style: {
                                strokeDasharray: '100',
                                animationDelay: '0.5s'
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/components/SplashScreen.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M0,90 Q80,80 150,75 T280,60 T400,45",
                            fill: "none",
                            stroke: "#14b8a6",
                            strokeWidth: "1",
                            className: "animate-chart-draw",
                            style: {
                                strokeDasharray: '100',
                                animationDelay: '0.8s'
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/components/SplashScreen.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/SplashScreen.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/SplashScreen.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 flex flex-col items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-24 h-24 rounded-2xl bg-gradient-to-br from-[#d4a853] to-[#b8953f] flex items-center justify-center neu-shadow animate-float",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-14 h-14 text-[#0a1929]",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    strokeWidth: 1.5,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/SplashScreen.tsx",
                                        lineNumber: 74,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/SplashScreen.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/SplashScreen.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 w-24 h-24 rounded-2xl animate-ping",
                                style: {
                                    background: 'rgba(212, 168, 83, 0.2)',
                                    animationDuration: '2s'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/components/SplashScreen.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/SplashScreen.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-5xl font-bold mb-3 animate-slide-up",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: '#d4a853'
                                },
                                children: "Prompt"
                            }, void 0, false, {
                                fileName: "[project]/app/components/SplashScreen.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white",
                                children: "Forge"
                            }, void 0, false, {
                                fileName: "[project]/app/components/SplashScreen.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/SplashScreen.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[#94a3b8] text-lg animate-slide-up",
                        style: {
                            animationDelay: '0.1s'
                        },
                        children: "AI-Powered Financial Analysis"
                    }, void 0, false, {
                        fileName: "[project]/app/components/SplashScreen.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 px-4 py-1.5 rounded-full border animate-slide-up",
                        style: {
                            borderColor: 'rgba(212, 168, 83, 0.3)',
                            background: 'rgba(212, 168, 83, 0.1)',
                            animationDelay: '0.2s'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm",
                            style: {
                                color: '#d4a853'
                            },
                            children: "For Finance Professionals"
                        }, void 0, false, {
                            fileName: "[project]/app/components/SplashScreen.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/SplashScreen.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-12 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 rounded-full animate-pulse",
                                style: {
                                    background: '#d4a853',
                                    animationDelay: '0s'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/components/SplashScreen.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 rounded-full animate-pulse",
                                style: {
                                    background: '#d4a853',
                                    animationDelay: '0.2s'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/components/SplashScreen.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 rounded-full animate-pulse",
                                style: {
                                    background: '#d4a853',
                                    animationDelay: '0.4s'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/components/SplashScreen.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/SplashScreen.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/SplashScreen.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-8 text-[#64748b] text-sm",
                children: "v2.0.0 • 18 Finance Templates"
            }, void 0, false, {
                fileName: "[project]/app/components/SplashScreen.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/SplashScreen.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(SplashScreen, "bVsv/MQwydp9AwQI0mVYeRywyMM=");
_c = SplashScreen;
var _c;
__turbopack_context__.k.register(_c, "SplashScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/Icons.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Modern icon components using Heroicons style
// Consistent 24x24 viewBox, strokeWidth 1.5-2
// Includes finance-specific icons for business/financial analysis
__turbopack_context__.s([
    "Icon",
    ()=>Icon,
    "Icons",
    ()=>Icons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const Icons = {
    // Navigation
    home: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 8,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // Actions
    sparkles: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 15,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    play: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 21,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    copy: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 27,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    check: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M4.5 12.75l6 6 9-13.5"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 33,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // Features
    variable: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 40,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    compress: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 46,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    shield: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 52,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    calculator: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 58,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    wand: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 64,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    template: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 70,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    history: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 76,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    lightbulb: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 82,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    help: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 88,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    info: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 94,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    arrowRight: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 100,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    arrowLeft: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 106,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    chevronRight: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M8.25 4.5l7.5 7.5-7.5 7.5"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 112,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    chevronDown: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M19.5 8.25l-7.5 7.5-7.5-7.5"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 118,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    settings: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                }, void 0, false, {
                    fileName: "[project]/app/components/Icons.tsx",
                    lineNumber: 125,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                }, void 0, false, {
                    fileName: "[project]/app/components/Icons.tsx",
                    lineNumber: 126,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 124,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    eye: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                }, void 0, false, {
                    fileName: "[project]/app/components/Icons.tsx",
                    lineNumber: 132,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                }, void 0, false, {
                    fileName: "[project]/app/components/Icons.tsx",
                    lineNumber: 133,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 131,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    bolt: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 138,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    beaker: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 144,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    star: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 150,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    github: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            fill: "currentColor",
            stroke: "none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fillRule: "evenodd",
                d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
                clipRule: "evenodd"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 156,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    x: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M6 18L18 6M6 6l12 12"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 162,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    plus: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M12 4.5v15m7.5-7.5h-15"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 168,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    minus: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M19.5 12h-15"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 174,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    refresh: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 180,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    trash: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 186,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    download: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 193,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 192,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    upload: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 198,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // ============================================
    // FINANCE-SPECIFIC ICONS
    // ============================================
    // Chart & Analytics
    chart: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 209,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    chartLine: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 215,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    pieChart: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
                }, void 0, false, {
                    fileName: "[project]/app/components/Icons.tsx",
                    lineNumber: 222,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
                }, void 0, false, {
                    fileName: "[project]/app/components/Icons.tsx",
                    lineNumber: 223,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 221,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    trendingUp: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 229,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 228,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    trendingDown: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 235,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 234,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // Finance & Business
    briefcase: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 242,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 241,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    building: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 248,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 247,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    bankNotes: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 254,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 253,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    dollar: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 260,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 259,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    percent: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M8.25 6.75a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm7.5 9a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM6 18.75L18 5.25"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 266,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 265,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    wallet: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 272,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 271,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // Documents & Reports
    document: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 279,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 278,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    documentChart: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3.75m3-6v6.75m1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 285,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 284,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    presentation: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 291,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 290,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    spreadsheet: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 297,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 296,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    clipboard: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 303,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 302,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // Strategy & Analysis
    target: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M12 21a9 9 0 100-18 9 9 0 000 18z"
                }, void 0, false, {
                    fileName: "[project]/app/components/Icons.tsx",
                    lineNumber: 310,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M12 15a3 3 0 100-6 3 3 0 000 6z"
                }, void 0, false, {
                    fileName: "[project]/app/components/Icons.tsx",
                    lineNumber: 311,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M12 12h.01"
                }, void 0, false, {
                    fileName: "[project]/app/components/Icons.tsx",
                    lineNumber: 312,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 309,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    scale: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 318,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 317,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    puzzle: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 324,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 323,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    globe: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 330,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 329,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    layers: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 336,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 335,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    adjustments: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 342,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 341,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // M&A & Deal specific
    handshake: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 349,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 348,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    merge: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 355,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 354,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    flag: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 361,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 360,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // User & Roles
    userCircle: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 368,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 367,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    users: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 374,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 373,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    academic: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 380,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 379,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // Clock & Time
    clock: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 387,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 386,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    calendar: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 393,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 392,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // Export
    arrowDownTray: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 400,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 399,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    // Search & Filter
    search: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 407,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 406,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    filter: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...iconProps(props),
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            }, void 0, false, {
                fileName: "[project]/app/components/Icons.tsx",
                lineNumber: 413,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/Icons.tsx",
            lineNumber: 412,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
};
// Helper to generate common props
function iconProps({ className = '', size = 24, strokeWidth = 1.5 }) {
    return {
        className,
        width: size,
        height: size,
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth
    };
}
function Icon({ name, ...props }) {
    const IconComponent = Icons[name];
    return IconComponent ? IconComponent(props) : null;
}
_c = Icon;
var _c;
__turbopack_context__.k.register(_c, "Icon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/Onboarding.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Onboarding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Icons.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const roles = [
    {
        id: 'analyst',
        title: 'Analyst',
        description: 'Building models, research, and analysis',
        icon: 'calculator'
    },
    {
        id: 'associate',
        title: 'Associate',
        description: 'Deal execution and client management',
        icon: 'briefcase'
    },
    {
        id: 'vp',
        title: 'VP / Director',
        description: 'Team leadership and deal origination',
        icon: 'users'
    },
    {
        id: 'csuite',
        title: 'C-Suite / Partner',
        description: 'Strategic decisions and oversight',
        icon: 'building'
    }
];
const useCases = [
    {
        id: 'valuation',
        title: 'Valuation & Modeling',
        description: 'DCF, Comps, LBO, and financial models',
        icon: 'chart',
        templates: [
            'DCF Valuation',
            'Comps Analysis',
            'Sensitivity Analysis'
        ]
    },
    {
        id: 'research',
        title: 'Investment Research',
        description: 'Due diligence, market sizing, competitive intel',
        icon: 'search',
        templates: [
            'Due Diligence',
            'TAM/SAM/SOM',
            'Competitive Intel'
        ]
    },
    {
        id: 'reporting',
        title: 'Reporting & Communication',
        description: 'Investor updates, board decks, executive summaries',
        icon: 'presentation',
        templates: [
            'Board Deck',
            'Investor Update',
            'Executive Summary'
        ]
    },
    {
        id: 'strategy',
        title: 'Strategy & Planning',
        description: 'SWOT, OKRs, scenario planning, business plans',
        icon: 'target',
        templates: [
            'SWOT Analysis',
            'OKR Framework',
            'Scenario Planning'
        ]
    }
];
function Onboarding({ onComplete }) {
    _s();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [selectedRole, setSelectedRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedUseCase, setSelectedUseCase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const totalSteps = 5;
    const handleNext = ()=>{
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            // Save preferences
            if (selectedRole) localStorage.setItem('userRole', selectedRole);
            if (selectedUseCase) localStorage.setItem('userUseCase', selectedUseCase);
            localStorage.setItem('promptforge-onboarded', 'true');
            onComplete();
        }
    };
    const handleSkip = ()=>{
        localStorage.setItem('promptforge-onboarded', 'true');
        onComplete();
    };
    const canProceed = ()=>{
        if (step === 2) return selectedRole !== null;
        if (step === 3) return selectedUseCase !== null;
        return true;
    };
    const renderStep = ()=>{
        switch(step){
            case 1:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center max-w-lg animate-fade-in",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#d4a853] to-[#b8953f] flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icons"].sparkles, {
                                className: "w-10 h-10 text-[#0a1929]"
                            }, void 0, false, {
                                fileName: "[project]/app/components/Onboarding.tsx",
                                lineNumber: 64,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/Onboarding.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl font-bold text-white mb-4",
                            children: "Welcome to PromptForge"
                        }, void 0, false, {
                            fileName: "[project]/app/components/Onboarding.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[#94a3b8] text-lg mb-2",
                            children: "AI-Powered Financial Analysis"
                        }, void 0, false, {
                            fileName: "[project]/app/components/Onboarding.tsx",
                            lineNumber: 69,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[#64748b] mb-8",
                            children: "Create professional-grade financial analysis prompts in minutes. Built for investment banking, private equity, and corporate finance professionals."
                        }, void 0, false, {
                            fileName: "[project]/app/components/Onboarding.tsx",
                            lineNumber: 72,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap justify-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "badge badge-gold",
                                    children: "18 Finance Templates"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Onboarding.tsx",
                                    lineNumber: 77,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "badge badge-teal",
                                    children: "Excel-Ready Output"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Onboarding.tsx",
                                    lineNumber: 78,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "badge badge-navy",
                                    children: "Enterprise Grade"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Onboarding.tsx",
                                    lineNumber: 79,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/Onboarding.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/Onboarding.tsx",
                    lineNumber: 61,
                    columnNumber: 11
                }, this);
            case 2:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-2xl animate-fade-in",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-white text-center mb-2",
                            children: "What's your role?"
                        }, void 0, false, {
                            fileName: "[project]/app/components/Onboarding.tsx",
                            lineNumber: 87,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[#94a3b8] text-center mb-8",
                            children: "We'll customize your experience based on your level"
                        }, void 0, false, {
                            fileName: "[project]/app/components/Onboarding.tsx",
                            lineNumber: 90,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                            children: roles.map((role)=>{
                                const IconComponent = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icons"][role.icon];
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedRole(role.id),
                                    className: `p-5 rounded-xl border text-left transition-all ${selectedRole === role.id ? 'border-[#d4a853] bg-[rgba(212,168,83,0.1)]' : 'border-[#1e3a5f] bg-[#0f2137] hover:border-[#2d4a6f]'}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `p-2 rounded-lg ${selectedRole === role.id ? 'bg-[rgba(212,168,83,0.2)]' : 'bg-[#162a45]'}`,
                                                children: IconComponent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                                                    className: `w-6 h-6 ${selectedRole === role.id ? 'text-[#d4a853]' : 'text-[#627d98]'}`
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Onboarding.tsx",
                                                    lineNumber: 112,
                                                    columnNumber: 43
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Onboarding.tsx",
                                                lineNumber: 107,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: `font-semibold ${selectedRole === role.id ? 'text-white' : 'text-[#94a3b8]'}`,
                                                        children: role.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/Onboarding.tsx",
                                                        lineNumber: 117,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-[#64748b] mt-1",
                                                        children: role.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/Onboarding.tsx",
                                                        lineNumber: 122,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/Onboarding.tsx",
                                                lineNumber: 116,
                                                columnNumber: 23
                                            }, this),
                                            selectedRole === role.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ml-auto",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icons"].check, {
                                                    className: "w-5 h-5 text-[#d4a853]"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Onboarding.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 27
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Onboarding.tsx",
                                                lineNumber: 127,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/Onboarding.tsx",
                                        lineNumber: 106,
                                        columnNumber: 21
                                    }, this)
                                }, role.id, false, {
                                    fileName: "[project]/app/components/Onboarding.tsx",
                                    lineNumber: 97,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/components/Onboarding.tsx",
                            lineNumber: 93,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/Onboarding.tsx",
                    lineNumber: 86,
                    columnNumber: 11
                }, this);
            case 3:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-2xl animate-fade-in",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-white text-center mb-2",
                            children: "Primary use case?"
                        }, void 0, false, {
                            fileName: "[project]/app/components/Onboarding.tsx",
                            lineNumber: 142,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[#94a3b8] text-center mb-8",
                            children: "We'll recommend the best templates for your workflow"
                        }, void 0, false, {
                            fileName: "[project]/app/components/Onboarding.tsx",
                            lineNumber: 145,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                            children: useCases.map((useCase)=>{
                                const IconComponent = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icons"][useCase.icon];
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedUseCase(useCase.id),
                                    className: `p-5 rounded-xl border text-left transition-all ${selectedUseCase === useCase.id ? 'border-[#d4a853] bg-[rgba(212,168,83,0.1)]' : 'border-[#1e3a5f] bg-[#0f2137] hover:border-[#2d4a6f]'}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `p-2 rounded-lg ${selectedUseCase === useCase.id ? 'bg-[rgba(212,168,83,0.2)]' : 'bg-[#162a45]'}`,
                                                children: IconComponent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                                                    className: `w-6 h-6 ${selectedUseCase === useCase.id ? 'text-[#d4a853]' : 'text-[#627d98]'}`
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Onboarding.tsx",
                                                    lineNumber: 167,
                                                    columnNumber: 43
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Onboarding.tsx",
                                                lineNumber: 162,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: `font-semibold ${selectedUseCase === useCase.id ? 'text-white' : 'text-[#94a3b8]'}`,
                                                        children: useCase.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/Onboarding.tsx",
                                                        lineNumber: 172,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-[#64748b] mt-1",
                                                        children: useCase.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/Onboarding.tsx",
                                                        lineNumber: 177,
                                                        columnNumber: 25
                                                    }, this),
                                                    selectedUseCase === useCase.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap gap-1 mt-2",
                                                        children: useCase.templates.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs px-2 py-0.5 rounded bg-[rgba(212,168,83,0.15)] text-[#d4a853]",
                                                                children: t
                                                            }, t, false, {
                                                                fileName: "[project]/app/components/Onboarding.tsx",
                                                                lineNumber: 183,
                                                                columnNumber: 31
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/Onboarding.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/Onboarding.tsx",
                                                lineNumber: 171,
                                                columnNumber: 23
                                            }, this),
                                            selectedUseCase === useCase.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icons"].check, {
                                                className: "w-5 h-5 text-[#d4a853] shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/Onboarding.tsx",
                                                lineNumber: 191,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/Onboarding.tsx",
                                        lineNumber: 161,
                                        columnNumber: 21
                                    }, this)
                                }, useCase.id, false, {
                                    fileName: "[project]/app/components/Onboarding.tsx",
                                    lineNumber: 152,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/components/Onboarding.tsx",
                            lineNumber: 148,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/Onboarding.tsx",
                    lineNumber: 141,
                    columnNumber: 11
                }, this);
            case 4:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-3xl animate-fade-in",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-white text-center mb-2",
                            children: "See it in action"
                        }, void 0, false, {
                            fileName: "[project]/app/components/Onboarding.tsx",
                            lineNumber: 204,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[#94a3b8] text-center mb-8",
                            children: "Here's how PromptForge helps you create professional financial analysis"
                        }, void 0, false, {
                            fileName: "[project]/app/components/Onboarding.tsx",
                            lineNumber: 207,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-[#0f2137] rounded-2xl border border-[#1e3a5f] p-6 mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 mb-4 pb-4 border-b border-[#1e3a5f]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4a853] to-[#b8953f] flex items-center justify-center text-xl",
                                            children: "📊"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/Onboarding.tsx",
                                            lineNumber: 215,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-semibold text-white",
                                                    children: "DCF Valuation Model"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Onboarding.tsx",
                                                    lineNumber: 219,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-[#64748b]",
                                                    children: "Financial Analysis • Advanced • 30 min"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Onboarding.tsx",
                                                    lineNumber: 220,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/Onboarding.tsx",
                                            lineNumber: 218,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ml-auto flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "badge badge-excel text-xs",
                                                    children: "Excel"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Onboarding.tsx",
                                                    lineNumber: 223,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "badge badge-memo text-xs",
                                                    children: "Memo"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Onboarding.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/Onboarding.tsx",
                                            lineNumber: 222,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/Onboarding.tsx",
                                    lineNumber: 214,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4 mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm text-[#94a3b8] mb-1",
                                                    children: "Company Name"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Onboarding.tsx",
                                                    lineNumber: 231,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "px-3 py-2 rounded-lg bg-[#0a1929] border border-[#1e3a5f] text-white text-sm",
                                                    children: "Acme Corporation"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Onboarding.tsx",
                                                    lineNumber: 232,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/Onboarding.tsx",
                                            lineNumber: 230,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm text-[#94a3b8] mb-1",
                                                    children: "Industry"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Onboarding.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "px-3 py-2 rounded-lg bg-[#0a1929] border border-[#1e3a5f] text-white text-sm",
                                                    children: "Technology"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Onboarding.tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/Onboarding.tsx",
                                            lineNumber: 236,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm text-[#94a3b8] mb-1",
                                                    children: "Revenue ($M)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Onboarding.tsx",
                                                    lineNumber: 243,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "px-3 py-2 rounded-lg bg-[#0a1929] border border-[#1e3a5f] text-white text-sm tabular-nums",
                                                    children: "$250.0M"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Onboarding.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/Onboarding.tsx",
                                            lineNumber: 242,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm text-[#94a3b8] mb-1",
                                                    children: "WACC Range"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Onboarding.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "px-3 py-2 rounded-lg bg-[#0a1929] border border-[#1e3a5f] text-white text-sm tabular-nums",
                                                    children: "8% - 12%"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Onboarding.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/Onboarding.tsx",
                                            lineNumber: 248,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/Onboarding.tsx",
                                    lineNumber: 229,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 rounded-lg bg-[#0a1929] border border-[#1e3a5f]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-[#64748b] mb-2",
                                            children: "Generated Prompt Preview:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/Onboarding.tsx",
                                            lineNumber: 258,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-[#94a3b8] line-clamp-2",
                                            children: "Create a comprehensive DCF (Discounted Cash Flow) valuation analysis for Acme Corporation in the Technology sector..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/Onboarding.tsx",
                                            lineNumber: 259,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/Onboarding.tsx",
                                    lineNumber: 257,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/Onboarding.tsx",
                            lineNumber: 212,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-3 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center p-4 rounded-xl bg-[#0f2137] border border-[#1e3a5f]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-[#d4a853] tabular-nums",
                                            children: "18"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/Onboarding.tsx",
                                            lineNumber: 268,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-[#64748b]",
                                            children: "Finance Templates"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/Onboarding.tsx",
                                            lineNumber: 269,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/Onboarding.tsx",
                                    lineNumber: 267,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center p-4 rounded-xl bg-[#0f2137] border border-[#1e3a5f]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-[#14b8a6] tabular-nums",
                                            children: "5"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/Onboarding.tsx",
                                            lineNumber: 272,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-[#64748b]",
                                            children: "Categories"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/Onboarding.tsx",
                                            lineNumber: 273,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/Onboarding.tsx",
                                    lineNumber: 271,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center p-4 rounded-xl bg-[#0f2137] border border-[#1e3a5f]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-[#627d98]",
                                            children: "4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/Onboarding.tsx",
                                            lineNumber: 276,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-[#64748b]",
                                            children: "Export Formats"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/Onboarding.tsx",
                                            lineNumber: 277,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/Onboarding.tsx",
                                    lineNumber: 275,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/Onboarding.tsx",
                            lineNumber: 266,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/Onboarding.tsx",
                    lineNumber: 203,
                    columnNumber: 11
                }, this);
            case 5:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center max-w-lg animate-fade-in",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#059669] to-[#10b981] flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icons"].check, {
                                className: "w-10 h-10 text-white"
                            }, void 0, false, {
                                fileName: "[project]/app/components/Onboarding.tsx",
                                lineNumber: 288,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/Onboarding.tsx",
                            lineNumber: 287,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl font-bold text-white mb-4",
                            children: "You're all set!"
                        }, void 0, false, {
                            fileName: "[project]/app/components/Onboarding.tsx",
                            lineNumber: 290,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[#94a3b8] text-lg mb-8",
                            children: "Start creating professional financial analysis prompts with PromptForge."
                        }, void 0, false, {
                            fileName: "[project]/app/components/Onboarding.tsx",
                            lineNumber: 293,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-left bg-[#0f2137] rounded-xl border border-[#1e3a5f] p-4 mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-sm font-medium text-[#94a3b8] mb-3",
                                    children: "Recommended for you:"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Onboarding.tsx",
                                    lineNumber: 299,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: selectedUseCase && useCases.find((u)=>u.id === selectedUseCase)?.templates.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 p-2 rounded-lg hover:bg-[#162a45] transition-colors cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-8 h-8 rounded-lg bg-[rgba(212,168,83,0.15)] flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icons"].template, {
                                                        className: "w-4 h-4 text-[#d4a853]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/Onboarding.tsx",
                                                        lineNumber: 304,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Onboarding.tsx",
                                                    lineNumber: 303,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-white",
                                                    children: t
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Onboarding.tsx",
                                                    lineNumber: 306,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icons"].arrowRight, {
                                                    className: "w-4 h-4 text-[#64748b] ml-auto"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Onboarding.tsx",
                                                    lineNumber: 307,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, t, true, {
                                            fileName: "[project]/app/components/Onboarding.tsx",
                                            lineNumber: 302,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Onboarding.tsx",
                                    lineNumber: 300,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/Onboarding.tsx",
                            lineNumber: 298,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/Onboarding.tsx",
                    lineNumber: 285,
                    columnNumber: 11
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex flex-col items-center justify-center p-6",
        style: {
            background: 'linear-gradient(135deg, #0a1929 0%, #102a43 50%, #1a3352 100%)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-mesh opacity-20"
            }, void 0, false, {
                fileName: "[project]/app/components/Onboarding.tsx",
                lineNumber: 323,
                columnNumber: 7
            }, this),
            step < totalSteps && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleSkip,
                className: "absolute top-6 right-6 text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors",
                children: "Skip"
            }, void 0, false, {
                fileName: "[project]/app/components/Onboarding.tsx",
                lineNumber: 327,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-6 left-1/2 -translate-x-1/2 flex gap-2",
                children: Array.from({
                    length: totalSteps
                }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `h-1.5 rounded-full transition-all ${i + 1 <= step ? 'w-8 bg-[#d4a853]' : 'w-4 bg-[#1e3a5f]'}`
                    }, i, false, {
                        fileName: "[project]/app/components/Onboarding.tsx",
                        lineNumber: 338,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/Onboarding.tsx",
                lineNumber: 336,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 flex flex-col items-center justify-center flex-1 w-full",
                children: renderStep()
            }, void 0, false, {
                fileName: "[project]/app/components/Onboarding.tsx",
                lineNumber: 350,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 w-full max-w-2xl flex justify-between items-center pt-6",
                children: [
                    step > 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setStep(step - 1),
                        className: "flex items-center gap-2 text-[#94a3b8] hover:text-white transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icons"].arrowLeft, {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/app/components/Onboarding.tsx",
                                lineNumber: 361,
                                columnNumber: 13
                            }, this),
                            "Back"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Onboarding.tsx",
                        lineNumber: 357,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                        fileName: "[project]/app/components/Onboarding.tsx",
                        lineNumber: 365,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleNext,
                        disabled: !canProceed(),
                        className: `btn-primary flex items-center gap-2 ${!canProceed() ? 'opacity-50 cursor-not-allowed' : ''}`,
                        children: [
                            step === totalSteps ? 'Get Started' : 'Continue',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icons"].arrowRight, {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/app/components/Onboarding.tsx",
                                lineNumber: 376,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Onboarding.tsx",
                        lineNumber: 368,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Onboarding.tsx",
                lineNumber: 355,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/Onboarding.tsx",
        lineNumber: 318,
        columnNumber: 5
    }, this);
}
_s(Onboarding, "uoaablxE1EIhUTJELCbwv6O4yPc=");
_c = Onboarding;
var _c;
__turbopack_context__.k.register(_c, "Onboarding");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/PromptTemplates.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PROMPT_TEMPLATES",
    ()=>PROMPT_TEMPLATES,
    "TEMPLATE_CATEGORIES",
    ()=>TEMPLATE_CATEGORIES,
    "getTemplatesByCategory",
    ()=>getTemplatesByCategory,
    "getTemplatesByDifficulty",
    ()=>getTemplatesByDifficulty,
    "getTemplatesByOutputFormat",
    ()=>getTemplatesByOutputFormat,
    "searchTemplates",
    ()=>searchTemplates
]);
'use client';
const PROMPT_TEMPLATES = [
    // ============================================
    // FINANCIAL ANALYSIS (4 templates)
    // ============================================
    {
        id: 'dcf-valuation',
        name: 'DCF Valuation Model',
        description: 'Build a discounted cash flow analysis with key assumptions and sensitivity',
        category: 'Financial Analysis',
        categorySlug: 'financial-analysis',
        icon: '📊',
        prompt: `Create a comprehensive DCF (Discounted Cash Flow) valuation analysis for {{company_name}}.

**Company Overview:**
- Industry: {{industry}}
- Current Revenue: \${{current_revenue}}M
- Current EBITDA Margin: {{ebitda_margin}}%
- Historical Growth Rate: {{historical_growth}}%

**Key Assumptions:**
- Projection Period: {{projection_years}} years
- Terminal Growth Rate: {{terminal_growth}}%
- WACC Range: {{wacc_low}}% - {{wacc_high}}%
- Tax Rate: {{tax_rate}}%

**Please provide:**
1. **Revenue Projections** - Year-by-year forecast with growth assumptions
2. **EBITDA Bridge** - From current to projected with margin improvement thesis
3. **Free Cash Flow Build** - CapEx, working capital, and D&A assumptions
4. **Terminal Value Calculation** - Using both perpetuity growth and exit multiple methods
5. **Enterprise Value Range** - Based on WACC sensitivity
6. **Equity Value Bridge** - Net debt adjustments
7. **Implied Multiples** - EV/Revenue, EV/EBITDA at various price points
8. **Key Sensitivities** - WACC vs. terminal growth matrix

Format the output as Excel-ready tables where applicable.`,
        variables: [
            {
                name: 'company_name',
                default: '',
                description: 'Target company name',
                type: 'text'
            },
            {
                name: 'industry',
                default: 'Technology',
                description: 'Industry sector',
                type: 'select',
                options: [
                    'Technology',
                    'Healthcare',
                    'Financial Services',
                    'Consumer',
                    'Industrial',
                    'Energy',
                    'Real Estate',
                    'Telecom'
                ]
            },
            {
                name: 'current_revenue',
                default: '100',
                description: 'Current annual revenue in millions',
                type: 'currency'
            },
            {
                name: 'ebitda_margin',
                default: '20',
                description: 'Current EBITDA margin',
                type: 'percentage'
            },
            {
                name: 'historical_growth',
                default: '15',
                description: 'Historical revenue growth rate',
                type: 'percentage'
            },
            {
                name: 'projection_years',
                default: '5',
                description: 'Number of projection years',
                type: 'number'
            },
            {
                name: 'terminal_growth',
                default: '2.5',
                description: 'Terminal/perpetuity growth rate',
                type: 'percentage'
            },
            {
                name: 'wacc_low',
                default: '8',
                description: 'Low end of WACC range',
                type: 'percentage'
            },
            {
                name: 'wacc_high',
                default: '12',
                description: 'High end of WACC range',
                type: 'percentage'
            },
            {
                name: 'tax_rate',
                default: '25',
                description: 'Effective tax rate',
                type: 'percentage'
            }
        ],
        tags: [
            'valuation',
            'dcf',
            'modeling',
            'investment-banking'
        ],
        difficulty: 'advanced',
        estimatedTime: '30 min',
        outputFormats: [
            'excel',
            'memo'
        ],
        useCases: [
            'M&A due diligence',
            'Investment committee memo',
            'Fairness opinion support'
        ],
        requiredInputs: [
            'company_name',
            'current_revenue'
        ]
    },
    {
        id: 'comparable-companies',
        name: 'Comparable Companies Analysis',
        description: 'Trading comps analysis with peer selection and multiple calculations',
        category: 'Financial Analysis',
        categorySlug: 'financial-analysis',
        icon: '📈',
        prompt: `Develop a comprehensive comparable companies analysis for {{company_name}} in the {{industry}} sector.

**Target Company Metrics:**
- LTM Revenue: \${{ltm_revenue}}M
- LTM EBITDA: \${{ltm_ebitda}}M
- Revenue Growth (YoY): {{revenue_growth}}%
- EBITDA Margin: {{ebitda_margin}}%

**Analysis Requirements:**

1. **Peer Universe Selection**
   - Identify 8-12 comparable public companies
   - Selection criteria: business model, size, geography, growth profile
   - Justify inclusions and notable exclusions

2. **Trading Multiples Calculation**
   - EV/Revenue (LTM and NTM)
   - EV/EBITDA (LTM and NTM)
   - P/E ratio (if profitable)
   - EV/EBIT for margin-adjusted comparison

3. **Statistical Analysis**
   - Mean, median, 25th/75th percentile for each multiple
   - High/low outlier identification
   - Size and growth-adjusted ranges

4. **Valuation Output**
   - Implied equity value range using selected multiples
   - Football field visualization data
   - Recommended valuation range with justification

5. **Key Observations**
   - Premium/discount drivers vs. peers
   - Market sentiment and recent trading dynamics
   - Relative valuation positioning

Format all data as sortable tables ready for Excel export.`,
        variables: [
            {
                name: 'company_name',
                default: '',
                description: 'Target company name',
                type: 'text'
            },
            {
                name: 'industry',
                default: 'Software',
                description: 'Industry for peer selection',
                type: 'select',
                options: [
                    'Software',
                    'Internet',
                    'Fintech',
                    'Healthcare IT',
                    'E-commerce',
                    'Cybersecurity',
                    'Cloud Infrastructure',
                    'Enterprise Software'
                ]
            },
            {
                name: 'ltm_revenue',
                default: '50',
                description: 'Last twelve months revenue ($M)',
                type: 'currency'
            },
            {
                name: 'ltm_ebitda',
                default: '10',
                description: 'Last twelve months EBITDA ($M)',
                type: 'currency'
            },
            {
                name: 'revenue_growth',
                default: '25',
                description: 'Year-over-year revenue growth',
                type: 'percentage'
            },
            {
                name: 'ebitda_margin',
                default: '20',
                description: 'EBITDA margin',
                type: 'percentage'
            }
        ],
        tags: [
            'comps',
            'valuation',
            'trading-multiples',
            'equity-research'
        ],
        difficulty: 'intermediate',
        estimatedTime: '20 min',
        outputFormats: [
            'excel',
            'powerpoint'
        ],
        useCases: [
            'Equity research',
            'Valuation benchmarking',
            'IPO pricing'
        ]
    },
    {
        id: 'earnings-analysis',
        name: 'Quarterly Earnings Analysis',
        description: 'Deep dive on earnings results with beat/miss analysis and guidance review',
        category: 'Financial Analysis',
        categorySlug: 'financial-analysis',
        icon: '💹',
        prompt: `Analyze the quarterly earnings results for {{company_name}} ({{ticker}}) for {{quarter}}.

**Reported Results:**
- Revenue: \${{reported_revenue}}M (Consensus: \${{consensus_revenue}}M)
- EPS: \${{reported_eps}} (Consensus: \${{consensus_eps}})
- Gross Margin: {{gross_margin}}%
- Operating Margin: {{operating_margin}}%

**Provide comprehensive analysis:**

1. **Beat/Miss Summary**
   - Revenue surprise (% and $)
   - EPS surprise (% and $)
   - Quality of beat (one-time items, accounting changes)

2. **Segment Performance**
   - Revenue by business segment
   - Geographic breakdown
   - Key product/service line trends

3. **Margin Analysis**
   - Gross margin trend vs. prior quarter and YoY
   - Operating leverage analysis
   - Cost structure changes (COGS, SG&A, R&D)

4. **Guidance Assessment**
   - Full-year guidance changes
   - Implied Q+1 expectations
   - Management credibility on prior guidance

5. **Management Commentary Highlights**
   - Key themes from earnings call
   - Forward outlook and tone
   - Risk factors mentioned

6. **Investment Implications**
   - Near-term trading thesis
   - Impact on full-year estimates
   - Key metrics to monitor

Format key metrics as bullet points suitable for client communication.`,
        variables: [
            {
                name: 'company_name',
                default: '',
                description: 'Company name',
                type: 'text'
            },
            {
                name: 'ticker',
                default: '',
                description: 'Stock ticker symbol',
                type: 'text'
            },
            {
                name: 'quarter',
                default: 'Q4 2024',
                description: 'Fiscal quarter',
                type: 'text'
            },
            {
                name: 'reported_revenue',
                default: '',
                description: 'Reported revenue ($M)',
                type: 'currency'
            },
            {
                name: 'consensus_revenue',
                default: '',
                description: 'Consensus revenue estimate ($M)',
                type: 'currency'
            },
            {
                name: 'reported_eps',
                default: '',
                description: 'Reported earnings per share',
                type: 'number'
            },
            {
                name: 'consensus_eps',
                default: '',
                description: 'Consensus EPS estimate',
                type: 'number'
            },
            {
                name: 'gross_margin',
                default: '',
                description: 'Gross margin %',
                type: 'percentage'
            },
            {
                name: 'operating_margin',
                default: '',
                description: 'Operating margin %',
                type: 'percentage'
            }
        ],
        tags: [
            'earnings',
            'equity-research',
            'trading',
            'analysis'
        ],
        difficulty: 'intermediate',
        estimatedTime: '15 min',
        outputFormats: [
            'memo',
            'pdf'
        ],
        useCases: [
            'Morning note',
            'Client alert',
            'Portfolio review'
        ]
    },
    {
        id: 'sensitivity-analysis',
        name: 'Sensitivity Analysis Builder',
        description: 'Create multi-variable sensitivity tables for financial models',
        category: 'Financial Analysis',
        categorySlug: 'financial-analysis',
        icon: '🎯',
        prompt: `Build a comprehensive sensitivity analysis for {{analysis_type}} valuation of {{company_name}}.

**Base Case Assumptions:**
- Base Value: \${{base_value}}M
- Primary Variable: {{primary_variable}} (Base: {{primary_base}}%)
- Secondary Variable: {{secondary_variable}} (Base: {{secondary_base}}%)

**Create the following sensitivity outputs:**

1. **Two-Variable Sensitivity Matrix**
   - {{primary_variable}} range: {{primary_low}}% to {{primary_high}}% ({{primary_steps}} steps)
   - {{secondary_variable}} range: {{secondary_low}}% to {{secondary_high}}% ({{secondary_steps}} steps)
   - Show implied value at each intersection

2. **One-Variable Sensitivity Tables**
   - Individual impact of each variable
   - Breakeven analysis points
   - Value creation/destruction ranges

3. **Scenario Analysis**
   - Bull case: Optimistic assumptions
   - Base case: Current assumptions
   - Bear case: Pessimistic assumptions
   - Include probability-weighted expected value

4. **Key Insights**
   - Most sensitive assumptions
   - Value inflection points
   - Risk-adjusted recommendations

5. **Visual Data for Charts**
   - Tornado chart data (sensitivity ranking)
   - Spider/radar chart inputs
   - Waterfall bridge data

Format all tables for direct Excel paste with conditional formatting guidance.`,
        variables: [
            {
                name: 'company_name',
                default: '',
                description: 'Company or project name',
                type: 'text'
            },
            {
                name: 'analysis_type',
                default: 'DCF',
                description: 'Type of valuation',
                type: 'select',
                options: [
                    'DCF',
                    'LBO',
                    'Comps',
                    'Sum-of-Parts',
                    'Real Option'
                ]
            },
            {
                name: 'base_value',
                default: '500',
                description: 'Base case value ($M)',
                type: 'currency'
            },
            {
                name: 'primary_variable',
                default: 'WACC',
                description: 'Primary sensitivity variable',
                type: 'text'
            },
            {
                name: 'primary_base',
                default: '10',
                description: 'Primary variable base case',
                type: 'percentage'
            },
            {
                name: 'primary_low',
                default: '8',
                description: 'Primary variable low',
                type: 'percentage'
            },
            {
                name: 'primary_high',
                default: '12',
                description: 'Primary variable high',
                type: 'percentage'
            },
            {
                name: 'primary_steps',
                default: '5',
                description: 'Number of steps',
                type: 'number'
            },
            {
                name: 'secondary_variable',
                default: 'Terminal Growth',
                description: 'Secondary sensitivity variable',
                type: 'text'
            },
            {
                name: 'secondary_base',
                default: '2.5',
                description: 'Secondary variable base case',
                type: 'percentage'
            },
            {
                name: 'secondary_low',
                default: '1.5',
                description: 'Secondary variable low',
                type: 'percentage'
            },
            {
                name: 'secondary_high',
                default: '3.5',
                description: 'Secondary variable high',
                type: 'percentage'
            },
            {
                name: 'secondary_steps',
                default: '5',
                description: 'Number of steps',
                type: 'number'
            }
        ],
        tags: [
            'sensitivity',
            'modeling',
            'scenario-analysis',
            'risk'
        ],
        difficulty: 'intermediate',
        estimatedTime: '15 min',
        outputFormats: [
            'excel',
            'powerpoint'
        ],
        useCases: [
            'Board presentation',
            'Investment committee',
            'Risk assessment'
        ]
    },
    // ============================================
    // INVESTMENT RESEARCH (4 templates)
    // ============================================
    {
        id: 'due-diligence',
        name: 'Due Diligence Framework',
        description: 'Comprehensive DD checklist and analysis framework for M&A or investments',
        category: 'Investment Research',
        categorySlug: 'investment-research',
        icon: '🔍',
        prompt: `Create a comprehensive due diligence framework for {{company_name}} in the context of a {{transaction_type}}.

**Deal Context:**
- Transaction Type: {{transaction_type}}
- Target Sector: {{sector}}
- Deal Size: \${{deal_size}}M
- Investment Thesis: {{investment_thesis}}

**Develop DD framework covering:**

1. **Business Due Diligence**
   - Market position and competitive dynamics
   - Customer concentration and churn analysis
   - Revenue quality (recurring vs. one-time)
   - Go-to-market efficiency
   - Technology/IP assessment
   - Management team evaluation

2. **Financial Due Diligence**
   - Quality of earnings analysis
   - Working capital normalization
   - CapEx requirements (maintenance vs. growth)
   - Off-balance sheet items
   - Tax structure review
   - Accounting policy assessment

3. **Commercial Due Diligence**
   - Market size validation (TAM/SAM/SOM)
   - Competitive positioning
   - Customer reference calls framework
   - Pricing power analysis
   - Channel assessment

4. **Operational Due Diligence**
   - Operational efficiency metrics
   - Scalability assessment
   - Integration complexity
   - Synergy identification
   - Key person dependencies

5. **Legal & Compliance**
   - Material contracts review
   - Litigation and contingencies
   - Regulatory compliance
   - IP ownership verification
   - ESG considerations

6. **Red Flags Checklist**
   - Common deal-breakers by category
   - Risk mitigation strategies

Provide prioritized action items with responsible parties and timelines.`,
        variables: [
            {
                name: 'company_name',
                default: '',
                description: 'Target company name',
                type: 'text'
            },
            {
                name: 'transaction_type',
                default: 'Acquisition',
                description: 'Type of transaction',
                type: 'select',
                options: [
                    'Acquisition',
                    'Minority Investment',
                    'Growth Equity',
                    'LBO',
                    'Merger',
                    'Carve-out'
                ]
            },
            {
                name: 'sector',
                default: 'Technology',
                description: 'Target sector',
                type: 'text'
            },
            {
                name: 'deal_size',
                default: '100',
                description: 'Transaction size ($M)',
                type: 'currency'
            },
            {
                name: 'investment_thesis',
                default: '',
                description: 'Brief investment thesis',
                type: 'textarea'
            }
        ],
        tags: [
            'due-diligence',
            'm&a',
            'investment',
            'private-equity'
        ],
        difficulty: 'advanced',
        estimatedTime: '30 min',
        outputFormats: [
            'memo',
            'excel'
        ],
        useCases: [
            'M&A process',
            'PE investment',
            'Strategic acquisition'
        ]
    },
    {
        id: 'tam-sam-som',
        name: 'TAM/SAM/SOM Analysis',
        description: 'Market sizing framework with top-down and bottom-up approaches',
        category: 'Investment Research',
        categorySlug: 'investment-research',
        icon: '🌍',
        prompt: `Develop a comprehensive market sizing analysis for {{company_name}} operating in the {{market_segment}} market.

**Company Context:**
- Current Revenue: \${{current_revenue}}M
- Primary Geography: {{geography}}
- Business Model: {{business_model}}
- Key Products/Services: {{products}}

**Provide market sizing using both methodologies:**

1. **Top-Down Analysis**
   - **TAM (Total Addressable Market)**
     - Global market definition
     - Industry research sources and data
     - Growth drivers and trends
     - 5-year CAGR projection

   - **SAM (Serviceable Addressable Market)**
     - Geographic filtering
     - Segment-specific sizing
     - Channel accessibility

   - **SOM (Serviceable Obtainable Market)**
     - Realistic market share targets
     - Competitive intensity factor
     - Go-to-market capacity constraints

2. **Bottom-Up Analysis**
   - Customer universe quantification
   - Average contract value assumptions
   - Penetration rate modeling
   - Customer acquisition capacity

3. **Market Dynamics**
   - Key growth drivers
   - Market headwinds
   - Regulatory impacts
   - Technology disruption factors

4. **Competitive Landscape**
   - Major players and market share
   - Emerging competitors
   - Substitution threats

5. **Opportunity Assessment**
   - Revenue potential by segment
   - Prioritized market opportunities
   - Entry barriers and moats

Include data tables with sources and assumptions clearly documented.`,
        variables: [
            {
                name: 'company_name',
                default: '',
                description: 'Company name',
                type: 'text'
            },
            {
                name: 'market_segment',
                default: '',
                description: 'Primary market segment',
                type: 'text'
            },
            {
                name: 'current_revenue',
                default: '10',
                description: 'Current annual revenue ($M)',
                type: 'currency'
            },
            {
                name: 'geography',
                default: 'North America',
                description: 'Primary geography',
                type: 'select',
                options: [
                    'North America',
                    'Europe',
                    'APAC',
                    'Global',
                    'Latin America',
                    'Middle East'
                ]
            },
            {
                name: 'business_model',
                default: 'SaaS',
                description: 'Business model type',
                type: 'select',
                options: [
                    'SaaS',
                    'Marketplace',
                    'E-commerce',
                    'Hardware',
                    'Services',
                    'Hybrid'
                ]
            },
            {
                name: 'products',
                default: '',
                description: 'Key products or services',
                type: 'textarea'
            }
        ],
        tags: [
            'market-sizing',
            'tam',
            'research',
            'strategy'
        ],
        difficulty: 'intermediate',
        estimatedTime: '20 min',
        outputFormats: [
            'powerpoint',
            'memo'
        ],
        useCases: [
            'Investor pitch',
            'Strategic planning',
            'New market entry'
        ]
    },
    {
        id: 'competitive-intelligence',
        name: 'Competitive Intelligence Report',
        description: 'Deep competitive analysis with positioning and strategic implications',
        category: 'Investment Research',
        categorySlug: 'investment-research',
        icon: '🎭',
        prompt: `Create a comprehensive competitive intelligence report for {{company_name}} in the {{industry}} space.

**Analysis Scope:**
- Primary Competitors: {{competitors}}
- Geographic Focus: {{geography}}
- Time Horizon: {{time_horizon}}

**Competitive Analysis Framework:**

1. **Competitor Profiles** (for each major competitor)
   - Company overview and strategy
   - Product/service portfolio
   - Pricing and positioning
   - Recent strategic moves
   - Strengths and weaknesses
   - Estimated financials (revenue, growth, margins)

2. **Comparative Analysis**
   - Feature/capability matrix
   - Pricing comparison table
   - Market share estimates
   - Customer segment overlap
   - Geographic presence

3. **Strategic Positioning Map**
   - 2x2 positioning framework
   - Differentiation factors
   - White space opportunities

4. **Competitive Dynamics**
   - Recent M&A activity
   - Partnership ecosystems
   - Technology investments
   - Talent movements
   - Funding and financial position

5. **Threat Assessment**
   - Direct competitive threats
   - Emerging/disruptive threats
   - Substitution risks
   - New entrant barriers

6. **Strategic Implications**
   - Competitive response recommendations
   - Differentiation opportunities
   - Defensive positioning needs
   - Monitoring triggers and KPIs

Format as executive summary with detailed appendix data.`,
        variables: [
            {
                name: 'company_name',
                default: '',
                description: 'Your company name',
                type: 'text'
            },
            {
                name: 'industry',
                default: '',
                description: 'Industry or market',
                type: 'text'
            },
            {
                name: 'competitors',
                default: '',
                description: 'Key competitors (comma-separated)',
                type: 'textarea'
            },
            {
                name: 'geography',
                default: 'Global',
                description: 'Geographic scope',
                type: 'text'
            },
            {
                name: 'time_horizon',
                default: '3 years',
                description: 'Analysis time horizon',
                type: 'select',
                options: [
                    '1 year',
                    '3 years',
                    '5 years'
                ]
            }
        ],
        tags: [
            'competitive-analysis',
            'strategy',
            'market-research',
            'intelligence'
        ],
        difficulty: 'intermediate',
        estimatedTime: '25 min',
        outputFormats: [
            'powerpoint',
            'memo'
        ],
        useCases: [
            'Strategic planning',
            'Board presentation',
            'Investment thesis'
        ]
    },
    {
        id: 'sector-deep-dive',
        name: 'Sector Deep-Dive',
        description: 'Comprehensive industry analysis with trends, drivers, and outlook',
        category: 'Investment Research',
        categorySlug: 'investment-research',
        icon: '🏭',
        prompt: `Develop a comprehensive sector deep-dive analysis for the {{sector}} industry.

**Analysis Parameters:**
- Sector: {{sector}}
- Sub-segment Focus: {{subsegment}}
- Geographic Scope: {{geography}}
- Investment Horizon: {{investment_horizon}}

**Sector Analysis Framework:**

1. **Industry Overview**
   - Market size and growth trajectory
   - Industry structure and value chain
   - Key players and market shares
   - Business model evolution

2. **Growth Drivers**
   - Macro tailwinds
   - Technology enablers
   - Regulatory catalysts
   - Consumer/enterprise demand shifts

3. **Industry Challenges**
   - Structural headwinds
   - Margin pressure sources
   - Regulatory risks
   - Disruption threats

4. **Competitive Landscape**
   - Industry concentration trends
   - Consolidation activity
   - New entrant dynamics
   - International competition

5. **Investment Themes**
   - High-conviction themes
   - Emerging opportunities
   - Risk factors to monitor
   - Catalyst timeline

6. **Valuation Context**
   - Historical trading ranges
   - Current sector multiples
   - Relative value assessment
   - M&A activity and premiums

7. **Top Picks Framework**
   - Selection criteria
   - Sector positioning considerations
   - Risk/reward profiles

Provide specific data points and sources where possible.`,
        variables: [
            {
                name: 'sector',
                default: '',
                description: 'Industry sector',
                type: 'select',
                options: [
                    'Software',
                    'Fintech',
                    'Healthcare',
                    'Consumer',
                    'Industrials',
                    'Energy',
                    'Real Estate',
                    'Financial Services',
                    'Media & Entertainment',
                    'Telecommunications'
                ]
            },
            {
                name: 'subsegment',
                default: '',
                description: 'Specific sub-segment focus',
                type: 'text'
            },
            {
                name: 'geography',
                default: 'Global',
                description: 'Geographic focus',
                type: 'text'
            },
            {
                name: 'investment_horizon',
                default: '12-24 months',
                description: 'Investment time horizon',
                type: 'select',
                options: [
                    '6 months',
                    '12-24 months',
                    '3-5 years',
                    '10+ years'
                ]
            }
        ],
        tags: [
            'sector-analysis',
            'industry-research',
            'thematic',
            'investing'
        ],
        difficulty: 'advanced',
        estimatedTime: '30 min',
        outputFormats: [
            'powerpoint',
            'pdf',
            'memo'
        ],
        useCases: [
            'Sector initiation',
            'Thematic research',
            'Portfolio allocation'
        ]
    },
    // ============================================
    // STRATEGY & PLANNING (4 templates)
    // ============================================
    {
        id: 'swot-analysis',
        name: 'SWOT Analysis',
        description: 'Strategic SWOT framework with actionable insights',
        category: 'Strategy & Planning',
        categorySlug: 'strategy-planning',
        icon: '⚡',
        prompt: `Create a comprehensive SWOT analysis for {{company_name}} to inform {{strategic_context}}.

**Company Context:**
- Industry: {{industry}}
- Company Stage: {{company_stage}}
- Current Strategy: {{current_strategy}}

**SWOT Analysis:**

1. **Strengths** (Internal Positive)
   - Core competencies
   - Competitive advantages
   - Resource strengths
   - Brand/reputation assets
   - Financial position
   - Talent/team capabilities

   *For each: Rate importance (High/Medium/Low) and sustainability*

2. **Weaknesses** (Internal Negative)
   - Capability gaps
   - Resource constraints
   - Operational inefficiencies
   - Competitive disadvantages
   - Financial limitations

   *For each: Rate severity and addressability*

3. **Opportunities** (External Positive)
   - Market trends
   - Technology enablers
   - Regulatory tailwinds
   - Competitive openings
   - Partnership potential
   - M&A opportunities

   *For each: Rate attractiveness and fit*

4. **Threats** (External Negative)
   - Competitive threats
   - Market shifts
   - Technology disruption
   - Regulatory risks
   - Economic factors
   - Talent competition

   *For each: Rate probability and impact*

5. **Strategic Implications Matrix**
   - SO Strategies (Strengths + Opportunities)
   - WO Strategies (Weaknesses + Opportunities)
   - ST Strategies (Strengths + Threats)
   - WT Strategies (Weaknesses + Threats)

6. **Priority Actions**
   - Immediate priorities (0-6 months)
   - Medium-term initiatives (6-18 months)
   - Long-term strategic moves (18+ months)

Format for board/leadership presentation with executive summary.`,
        variables: [
            {
                name: 'company_name',
                default: '',
                description: 'Company name',
                type: 'text'
            },
            {
                name: 'industry',
                default: '',
                description: 'Industry/sector',
                type: 'text'
            },
            {
                name: 'company_stage',
                default: 'Growth',
                description: 'Company stage',
                type: 'select',
                options: [
                    'Startup',
                    'Growth',
                    'Mature',
                    'Turnaround'
                ]
            },
            {
                name: 'strategic_context',
                default: 'annual strategic planning',
                description: 'Purpose of analysis',
                type: 'text'
            },
            {
                name: 'current_strategy',
                default: '',
                description: 'Brief current strategy description',
                type: 'textarea'
            }
        ],
        tags: [
            'swot',
            'strategy',
            'planning',
            'analysis'
        ],
        difficulty: 'beginner',
        estimatedTime: '15 min',
        outputFormats: [
            'powerpoint',
            'memo'
        ],
        useCases: [
            'Strategic planning',
            'Board presentation',
            'Investor materials'
        ]
    },
    {
        id: 'business-plan',
        name: 'Business Plan Builder',
        description: 'Structured business plan with financials and go-to-market strategy',
        category: 'Strategy & Planning',
        categorySlug: 'strategy-planning',
        icon: '📋',
        prompt: `Create a comprehensive business plan outline for {{company_name}} focused on {{business_focus}}.

**Business Overview:**
- Company Name: {{company_name}}
- Business Focus: {{business_focus}}
- Target Market: {{target_market}}
- Business Model: {{business_model}}
- Funding Goal: \${{funding_goal}}M

**Business Plan Structure:**

1. **Executive Summary**
   - Mission and vision statement
   - Value proposition
   - Key differentiators
   - Funding ask and use of proceeds
   - Key metrics/traction

2. **Problem & Solution**
   - Market problem definition
   - Current alternatives
   - Our solution
   - Why now?

3. **Market Opportunity**
   - TAM/SAM/SOM analysis
   - Target customer profile
   - Market trends and tailwinds

4. **Product/Service**
   - Product description
   - Key features and benefits
   - Technology/IP
   - Product roadmap

5. **Business Model**
   - Revenue model
   - Pricing strategy
   - Unit economics
   - Customer lifetime value

6. **Go-to-Market Strategy**
   - Sales strategy
   - Marketing channels
   - Partnerships
   - Customer acquisition cost targets

7. **Competitive Landscape**
   - Direct competitors
   - Indirect competitors
   - Competitive advantages
   - Barriers to entry

8. **Team**
   - Founders and leadership
   - Key hires needed
   - Advisory board
   - Organizational structure

9. **Financial Projections**
   - 3-5 year revenue forecast
   - Key assumptions
   - Path to profitability
   - Key metrics dashboard

10. **Funding & Milestones**
    - Current raise details
    - Use of proceeds
    - Key milestones
    - Future funding needs

Provide as structured outline with bullet points and placeholder data formats.`,
        variables: [
            {
                name: 'company_name',
                default: '',
                description: 'Company name',
                type: 'text'
            },
            {
                name: 'business_focus',
                default: '',
                description: 'Primary business focus',
                type: 'text'
            },
            {
                name: 'target_market',
                default: '',
                description: 'Target market/customer',
                type: 'text'
            },
            {
                name: 'business_model',
                default: 'SaaS',
                description: 'Business model',
                type: 'select',
                options: [
                    'SaaS',
                    'Marketplace',
                    'E-commerce',
                    'Hardware',
                    'Services',
                    'Freemium',
                    'Enterprise'
                ]
            },
            {
                name: 'funding_goal',
                default: '5',
                description: 'Funding target ($M)',
                type: 'currency'
            }
        ],
        tags: [
            'business-plan',
            'strategy',
            'fundraising',
            'startup'
        ],
        difficulty: 'intermediate',
        estimatedTime: '30 min',
        outputFormats: [
            'memo',
            'powerpoint',
            'pdf'
        ],
        useCases: [
            'Fundraising',
            'Board planning',
            'Strategic alignment'
        ]
    },
    {
        id: 'okr-framework',
        name: 'OKR Framework',
        description: 'Objectives and Key Results planning with cascading goals',
        category: 'Strategy & Planning',
        categorySlug: 'strategy-planning',
        icon: '🎯',
        prompt: `Develop a comprehensive OKR framework for {{company_name}} for {{time_period}}.

**Company Context:**
- Company/Team: {{company_name}}
- Time Period: {{time_period}}
- Primary Focus Area: {{focus_area}}
- Top Priority: {{top_priority}}

**OKR Framework:**

1. **Company-Level OKRs** (3-5 Objectives)
   For each objective:
   - Objective statement (qualitative, inspiring)
   - 3-5 Key Results (quantitative, measurable)
   - Owner
   - Confidence level (0-10)

2. **Department/Team OKRs**
   Cascaded from company objectives:
   - **Sales/Revenue**
   - **Product/Engineering**
   - **Marketing**
   - **Operations**
   - **Finance**
   - **People/HR**

3. **Key Results Best Practices**
   - Specific metrics with targets
   - Baseline and target values
   - Measurement methodology
   - Stretch vs. committed designation

4. **OKR Scoring Rubric**
   - 0.0-0.3: We failed to make real progress
   - 0.4-0.6: We made progress but fell short
   - 0.7-0.9: We delivered (target zone)
   - 1.0: We hit every target perfectly

5. **Alignment Matrix**
   - How team OKRs ladder to company OKRs
   - Cross-functional dependencies
   - Potential conflicts to resolve

6. **Cadence & Review**
   - Weekly check-in format
   - Monthly review process
   - Quarterly grading approach
   - Annual planning integration

7. **Success Metrics Dashboard**
   - Real-time tracking indicators
   - Leading vs. lagging metrics
   - Alert thresholds

Provide in a format ready for OKR tracking tools or spreadsheets.`,
        variables: [
            {
                name: 'company_name',
                default: '',
                description: 'Company or team name',
                type: 'text'
            },
            {
                name: 'time_period',
                default: 'Q1 2025',
                description: 'Planning period',
                type: 'text'
            },
            {
                name: 'focus_area',
                default: 'Growth',
                description: 'Primary focus area',
                type: 'select',
                options: [
                    'Growth',
                    'Profitability',
                    'Product',
                    'Market Expansion',
                    'Operational Excellence',
                    'Customer Success'
                ]
            },
            {
                name: 'top_priority',
                default: '',
                description: 'Single most important priority',
                type: 'text'
            }
        ],
        tags: [
            'okr',
            'planning',
            'goals',
            'strategy'
        ],
        difficulty: 'beginner',
        estimatedTime: '20 min',
        outputFormats: [
            'excel',
            'memo'
        ],
        useCases: [
            'Quarterly planning',
            'Annual planning',
            'Team alignment'
        ]
    },
    {
        id: 'scenario-planning',
        name: 'Scenario Planning',
        description: 'Strategic scenario analysis with contingency planning',
        category: 'Strategy & Planning',
        categorySlug: 'strategy-planning',
        icon: '🔮',
        prompt: `Develop a comprehensive scenario planning framework for {{company_name}} addressing {{key_uncertainty}}.

**Planning Context:**
- Company: {{company_name}}
- Key Uncertainty: {{key_uncertainty}}
- Planning Horizon: {{planning_horizon}}
- Current Strategy: {{current_strategy}}

**Scenario Planning Framework:**

1. **Key Drivers Identification**
   - Critical uncertainties (high impact, high uncertainty)
   - Important trends (high impact, more predictable)
   - Driving forces analysis

2. **Scenario Matrix Development**
   - Driver 1: {{driver_1}} (Axis A)
   - Driver 2: {{driver_2}} (Axis B)

   **Four Scenarios:**
   - Scenario A: [High Driver 1 + High Driver 2]
   - Scenario B: [High Driver 1 + Low Driver 2]
   - Scenario C: [Low Driver 1 + High Driver 2]
   - Scenario D: [Low Driver 1 + Low Driver 2]

3. **Scenario Narratives**
   For each scenario:
   - Descriptive name/title
   - Narrative description (2-3 paragraphs)
   - Key characteristics
   - Market implications
   - Competitive dynamics
   - Financial impact range
   - Probability assessment

4. **Strategic Implications**
   For each scenario:
   - Required capabilities
   - Investment priorities
   - Risk mitigation needs
   - Opportunity capture strategies

5. **Robust Strategies**
   - Strategies that work across all scenarios
   - Scenario-specific options
   - Trigger points for strategy shifts

6. **Early Warning Indicators**
   - Leading indicators for each scenario
   - Monitoring framework
   - Decision trigger points

7. **Action Plan**
   - No-regret moves
   - Options to preserve
   - Big bets with timing

Present as strategic workshop output with visual framework.`,
        variables: [
            {
                name: 'company_name',
                default: '',
                description: 'Company name',
                type: 'text'
            },
            {
                name: 'key_uncertainty',
                default: '',
                description: 'Primary uncertainty to address',
                type: 'text'
            },
            {
                name: 'planning_horizon',
                default: '5 years',
                description: 'Planning time horizon',
                type: 'select',
                options: [
                    '2 years',
                    '5 years',
                    '10 years'
                ]
            },
            {
                name: 'current_strategy',
                default: '',
                description: 'Brief current strategy',
                type: 'textarea'
            },
            {
                name: 'driver_1',
                default: 'Market Growth',
                description: 'First key driver/uncertainty',
                type: 'text'
            },
            {
                name: 'driver_2',
                default: 'Technology Disruption',
                description: 'Second key driver/uncertainty',
                type: 'text'
            }
        ],
        tags: [
            'scenario-planning',
            'strategy',
            'risk',
            'planning'
        ],
        difficulty: 'advanced',
        estimatedTime: '30 min',
        outputFormats: [
            'powerpoint',
            'memo'
        ],
        useCases: [
            'Strategic planning',
            'Board workshop',
            'Risk management'
        ]
    },
    // ============================================
    // M&A & DEAL WORK (3 templates)
    // ============================================
    {
        id: 'investment-memo',
        name: 'Investment Memo',
        description: 'Comprehensive IC memo with deal rationale and risk assessment',
        category: 'M&A & Deal Work',
        categorySlug: 'ma-deal-work',
        icon: '📝',
        prompt: `Create a comprehensive investment memo for {{company_name}} for Investment Committee review.

**Deal Overview:**
- Target: {{company_name}}
- Transaction Type: {{transaction_type}}
- Enterprise Value: \${{enterprise_value}}M
- Equity Investment: \${{equity_investment}}M
- Ownership: {{ownership}}%

**Investment Memo Structure:**

1. **Executive Summary**
   - Deal recommendation
   - Key investment highlights (3-5 bullets)
   - Critical risks (2-3 bullets)
   - Key terms overview
   - Return expectations

2. **Company Overview**
   - Business description
   - Products/services
   - Customer base
   - Geographic presence
   - Historical financials summary

3. **Investment Thesis**
   - Why this company?
   - Why now?
   - Why us?
   - Value creation levers
   - Strategic fit

4. **Market Opportunity**
   - Industry overview
   - Market size and growth
   - Competitive landscape
   - Target's market position

5. **Financial Analysis**
   - Historical performance
   - Projection summary
   - Key assumptions
   - Valuation analysis
   - Returns analysis (IRR/MOIC)

6. **Value Creation Plan**
   - Revenue growth initiatives
   - Margin improvement opportunities
   - Operational enhancements
   - Potential add-on acquisitions
   - Exit considerations

7. **Risk Assessment**
   - Key risks and mitigants
   - Downside scenarios
   - Deal-specific concerns
   - Due diligence findings

8. **Transaction Terms**
   - Valuation and structure
   - Key deal terms
   - Governance rights
   - Management arrangements

9. **Recommendation**
   - Clear recommendation
   - Key conditions
   - Next steps

Format as formal IC memo with appendix for detailed analysis.`,
        variables: [
            {
                name: 'company_name',
                default: '',
                description: 'Target company name',
                type: 'text'
            },
            {
                name: 'transaction_type',
                default: 'Buyout',
                description: 'Transaction type',
                type: 'select',
                options: [
                    'Buyout',
                    'Growth Equity',
                    'Minority Investment',
                    'Add-on Acquisition',
                    'Recapitalization'
                ]
            },
            {
                name: 'enterprise_value',
                default: '',
                description: 'Enterprise value ($M)',
                type: 'currency'
            },
            {
                name: 'equity_investment',
                default: '',
                description: 'Equity check size ($M)',
                type: 'currency'
            },
            {
                name: 'ownership',
                default: '',
                description: 'Target ownership percentage',
                type: 'percentage'
            }
        ],
        tags: [
            'investment-memo',
            'private-equity',
            'm&a',
            'ic-memo'
        ],
        difficulty: 'advanced',
        estimatedTime: '30 min',
        outputFormats: [
            'memo',
            'pdf'
        ],
        useCases: [
            'IC presentation',
            'Deal approval',
            'Partner review'
        ]
    },
    {
        id: 'term-sheet',
        name: 'Term Sheet Builder',
        description: 'Key deal terms framework for M&A or investment transactions',
        category: 'M&A & Deal Work',
        categorySlug: 'ma-deal-work',
        icon: '📄',
        prompt: `Create a comprehensive term sheet framework for {{transaction_type}} involving {{company_name}}.

**Transaction Overview:**
- Target Company: {{company_name}}
- Transaction Type: {{transaction_type}}
- Deal Size: \${{deal_size}}M
- Investor/Acquirer: {{investor}}

**Term Sheet Framework:**

1. **Transaction Structure**
   - Form of consideration (cash, stock, mixed)
   - Valuation basis (pre/post-money, enterprise value)
   - Payment structure (upfront, earnout, rollover)
   - Escrow/holdback provisions

2. **Economics**
   - Purchase price / investment amount
   - Valuation multiples implied
   - Cap table impact (if equity)
   - Debt assumptions / financing structure

3. **Governance & Control**
   - Board composition
   - Voting rights
   - Protective provisions
   - Information rights
   - Consent rights for major decisions

4. **Management & Employees**
   - Management rollover expectations
   - Employment agreements
   - Option pool / equity incentives
   - Non-compete/non-solicit terms
   - Retention arrangements

5. **Conditions & Process**
   - Due diligence period and scope
   - Exclusivity provisions
   - Regulatory approvals required
   - Third-party consents needed
   - Key conditions to closing

6. **Representations & Warranties**
   - Standard reps scope
   - Fundamental reps
   - Knowledge qualifiers
   - Sandbagging provisions

7. **Indemnification**
   - Survival periods
   - Cap and basket thresholds
   - Escrow/R&W insurance
   - Special indemnities

8. **Other Terms**
   - Confidentiality
   - Expense allocation
   - Governing law
   - Break-up fees (if applicable)

9. **Indicative Timeline**
   - Key milestones and dates
   - Expected closing date

Present as bullet points suitable for term sheet document draft.`,
        variables: [
            {
                name: 'company_name',
                default: '',
                description: 'Target company name',
                type: 'text'
            },
            {
                name: 'transaction_type',
                default: 'Acquisition',
                description: 'Type of transaction',
                type: 'select',
                options: [
                    'Acquisition',
                    'Merger',
                    'Series A/B/C Investment',
                    'Growth Equity',
                    'Buyout',
                    'Recapitalization'
                ]
            },
            {
                name: 'deal_size',
                default: '',
                description: 'Transaction size ($M)',
                type: 'currency'
            },
            {
                name: 'investor',
                default: '',
                description: 'Investor/Acquirer name',
                type: 'text'
            }
        ],
        tags: [
            'term-sheet',
            'm&a',
            'venture-capital',
            'deal-terms'
        ],
        difficulty: 'advanced',
        estimatedTime: '20 min',
        outputFormats: [
            'memo',
            'pdf'
        ],
        useCases: [
            'Deal negotiation',
            'LOI preparation',
            'Term sheet drafting'
        ]
    },
    {
        id: 'pitch-deck',
        name: 'Pitch Deck Outline',
        description: 'Investor-ready pitch deck structure with slide-by-slide guidance',
        category: 'M&A & Deal Work',
        categorySlug: 'ma-deal-work',
        icon: '🎬',
        prompt: `Create a comprehensive pitch deck outline for {{company_name}} for {{pitch_context}}.

**Company Overview:**
- Company: {{company_name}}
- Stage: {{company_stage}}
- Pitch Context: {{pitch_context}}
- Raise Amount: \${{raise_amount}}M
- Use of Funds: {{use_of_funds}}

**Pitch Deck Structure (15-20 slides):**

**Opening (Slides 1-3)**
1. **Title Slide**
   - Company name and logo
   - Tagline/one-liner
   - Presenter name and date

2. **The Hook**
   - Compelling statistic or insight
   - Why this matters now
   - Attention-grabbing visual

3. **Problem Statement**
   - Clear problem definition
   - Who experiences this problem
   - Current solutions and gaps
   - Cost of the problem

**Solution (Slides 4-7)**
4. **Solution Overview**
   - What we do (simple explanation)
   - How it works
   - Key differentiators
   - Demo screenshot/visual

5. **Product Deep-Dive**
   - Key features
   - Technology/IP
   - Product roadmap
   - Screenshots or demo flow

6. **Business Model**
   - How we make money
   - Pricing structure
   - Unit economics
   - Revenue model clarity

7. **Traction**
   - Key metrics and growth
   - Customer logos/testimonials
   - Revenue/usage charts
   - Milestone achievements

**Market (Slides 8-10)**
8. **Market Opportunity**
   - TAM/SAM/SOM
   - Market growth trends
   - Why now? (timing thesis)

9. **Competitive Landscape**
   - Competitive positioning
   - Key differentiators
   - Sustainable advantages
   - 2x2 positioning matrix

10. **Go-to-Market**
    - Customer acquisition strategy
    - Sales motion
    - Channel strategy
    - Partnership opportunities

**Team & Financials (Slides 11-14)**
11. **Team**
    - Founders and key hires
    - Relevant experience
    - Advisors (if notable)
    - Org growth plan

12. **Financials**
    - Historical performance
    - Projections (3-5 years)
    - Key assumptions
    - Path to profitability

13. **The Ask**
    - Raise amount
    - Use of proceeds
    - Key milestones this round will achieve
    - Expected runway

14. **Why Now / Why Us**
    - Investment thesis summary
    - Why this is the right time
    - Why this team will win

**Closing (Slide 15)**
15. **Contact & Appendix**
    - Contact information
    - Appendix reference (detailed financials, customer case studies, etc.)

Provide bullet point content suggestions and design notes for each slide.`,
        variables: [
            {
                name: 'company_name',
                default: '',
                description: 'Company name',
                type: 'text'
            },
            {
                name: 'company_stage',
                default: 'Series A',
                description: 'Company stage',
                type: 'select',
                options: [
                    'Pre-seed',
                    'Seed',
                    'Series A',
                    'Series B',
                    'Series C+',
                    'Growth',
                    'Pre-IPO'
                ]
            },
            {
                name: 'pitch_context',
                default: 'Series A fundraise',
                description: 'Purpose of pitch',
                type: 'text'
            },
            {
                name: 'raise_amount',
                default: '10',
                description: 'Target raise amount ($M)',
                type: 'currency'
            },
            {
                name: 'use_of_funds',
                default: '',
                description: 'Primary use of funds',
                type: 'textarea'
            }
        ],
        tags: [
            'pitch-deck',
            'fundraising',
            'investor',
            'presentation'
        ],
        difficulty: 'intermediate',
        estimatedTime: '25 min',
        outputFormats: [
            'powerpoint',
            'pdf'
        ],
        useCases: [
            'VC fundraising',
            'LP meetings',
            'Strategic investor pitch'
        ]
    },
    // ============================================
    // PROFESSIONAL REPORTING (3 templates)
    // ============================================
    {
        id: 'investor-update',
        name: 'Investor Update',
        description: 'Monthly/quarterly investor update with KPIs and narrative',
        category: 'Professional Reporting',
        categorySlug: 'professional-reporting',
        icon: '📨',
        prompt: `Create a comprehensive investor update for {{company_name}} for {{period}}.

**Reporting Period:**
- Company: {{company_name}}
- Period: {{period}}
- Update Frequency: {{frequency}}

**Investor Update Structure:**

1. **TL;DR Summary**
   - 3-5 bullet point highlights
   - Overall sentiment (green/yellow/red)
   - Key ask (if any)

2. **Key Metrics Dashboard**
   - **Revenue**: \${{revenue}}K ({{revenue_growth}}% MoM/QoQ)
   - **MRR/ARR**: \${{mrr}}K
   - **Cash Position**: \${{cash}}K
   - **Runway**: {{runway}} months
   - **Customers**: {{customers}} ({{customer_growth}}% growth)
   - **NRR**: {{nrr}}%

3. **What Went Well**
   - Major wins
   - Key milestones achieved
   - Team highlights
   - Customer/product wins

4. **Challenges & Learnings**
   - What didn't go as planned
   - Key learnings
   - How we're addressing challenges

5. **Product Update**
   - Key releases
   - Roadmap progress
   - Customer feedback themes

6. **Go-to-Market Update**
   - Pipeline status
   - Sales highlights
   - Marketing performance
   - Partnership updates

7. **Team Update**
   - Key hires
   - Org changes
   - Hiring priorities

8. **Financial Summary**
   - P&L snapshot
   - Burn rate
   - Variance to plan
   - Fundraising status (if applicable)

9. **Asks for Investors**
   - Specific help needed
   - Introductions requested
   - Expertise needed

10. **Looking Ahead**
    - Next period priorities
    - Key milestones to hit
    - Risks to monitor

Format as email-friendly update with clear sections and bullet points.`,
        variables: [
            {
                name: 'company_name',
                default: '',
                description: 'Company name',
                type: 'text'
            },
            {
                name: 'period',
                default: 'January 2025',
                description: 'Reporting period',
                type: 'text'
            },
            {
                name: 'frequency',
                default: 'Monthly',
                description: 'Update frequency',
                type: 'select',
                options: [
                    'Monthly',
                    'Quarterly'
                ]
            },
            {
                name: 'revenue',
                default: '',
                description: 'Period revenue ($K)',
                type: 'currency'
            },
            {
                name: 'revenue_growth',
                default: '',
                description: 'Revenue growth %',
                type: 'percentage'
            },
            {
                name: 'mrr',
                default: '',
                description: 'Monthly recurring revenue ($K)',
                type: 'currency'
            },
            {
                name: 'cash',
                default: '',
                description: 'Cash position ($K)',
                type: 'currency'
            },
            {
                name: 'runway',
                default: '',
                description: 'Runway in months',
                type: 'number'
            },
            {
                name: 'customers',
                default: '',
                description: 'Total customers',
                type: 'number'
            },
            {
                name: 'customer_growth',
                default: '',
                description: 'Customer growth %',
                type: 'percentage'
            },
            {
                name: 'nrr',
                default: '',
                description: 'Net revenue retention %',
                type: 'percentage'
            }
        ],
        tags: [
            'investor-update',
            'reporting',
            'communication',
            'kpis'
        ],
        difficulty: 'beginner',
        estimatedTime: '15 min',
        outputFormats: [
            'memo',
            'pdf'
        ],
        useCases: [
            'Investor communication',
            'Board prep',
            'Stakeholder updates'
        ]
    },
    {
        id: 'board-deck',
        name: 'Board Deck',
        description: 'Quarterly board presentation with strategic updates and financials',
        category: 'Professional Reporting',
        categorySlug: 'professional-reporting',
        icon: '👔',
        prompt: `Create a comprehensive board deck outline for {{company_name}} for {{quarter}} {{year}}.

**Board Meeting Context:**
- Company: {{company_name}}
- Period: {{quarter}} {{year}}
- Meeting Duration: {{meeting_duration}}
- Key Topic Focus: {{key_topic}}

**Board Deck Structure:**

**Pre-Read Section (Distribute in Advance)**
1. **Executive Summary (1 slide)**
   - Period performance summary
   - Key achievements
   - Critical decisions needed
   - Outlook summary

2. **Scorecard Dashboard (1-2 slides)**
   - KPI performance vs. targets
   - Traffic light status indicators
   - Trend arrows
   - YoY/QoQ comparisons

3. **Financial Performance (3-4 slides)**
   - P&L summary vs. budget and prior year
   - Revenue breakdown by segment/product
   - Expense analysis
   - Cash flow and runway
   - Balance sheet highlights

**Discussion Section**
4. **Strategic Update (2-3 slides)**
   - Progress on strategic priorities
   - OKR status
   - Key initiatives update
   - Competitive developments

5. **Product & Technology (2 slides)**
   - Product roadmap progress
   - Key releases and impact
   - Technology investments
   - Technical debt/security

6. **Go-to-Market (2 slides)**
   - Sales performance and pipeline
   - Marketing effectiveness
   - Customer success metrics
   - Partnership update

7. **People & Organization (1-2 slides)**
   - Headcount and hiring
   - Org changes
   - Culture/engagement metrics
   - Key talent updates

8. **Risk Management (1 slide)**
   - Top risks and mitigations
   - Risk heat map
   - New/emerging risks

**Decision Section**
9. **Decisions Required (1 slide)**
   - Specific approvals needed
   - Strategic decisions
   - Budget requests

10. **Deep Dive Topic: {{key_topic}} (3-5 slides)**
    - Context and background
    - Analysis and options
    - Recommendation
    - Discussion questions

**Appendix**
- Detailed financials
- Customer data
- Competitive analysis
- Supporting materials

Provide slide titles, key talking points, and suggested visualizations.`,
        variables: [
            {
                name: 'company_name',
                default: '',
                description: 'Company name',
                type: 'text'
            },
            {
                name: 'quarter',
                default: 'Q4',
                description: 'Quarter',
                type: 'select',
                options: [
                    'Q1',
                    'Q2',
                    'Q3',
                    'Q4'
                ]
            },
            {
                name: 'year',
                default: '2024',
                description: 'Year',
                type: 'text'
            },
            {
                name: 'meeting_duration',
                default: '2 hours',
                description: 'Meeting length',
                type: 'select',
                options: [
                    '1 hour',
                    '2 hours',
                    '3 hours',
                    'Half day'
                ]
            },
            {
                name: 'key_topic',
                default: '',
                description: 'Key deep-dive topic for this meeting',
                type: 'text'
            }
        ],
        tags: [
            'board-deck',
            'governance',
            'presentation',
            'reporting'
        ],
        difficulty: 'intermediate',
        estimatedTime: '30 min',
        outputFormats: [
            'powerpoint',
            'pdf'
        ],
        useCases: [
            'Board meeting',
            'Investor update',
            'Annual review'
        ]
    },
    {
        id: 'executive-summary',
        name: 'Executive Summary',
        description: 'Concise executive summary for reports, proposals, or analyses',
        category: 'Professional Reporting',
        categorySlug: 'professional-reporting',
        icon: '📑',
        prompt: `Create a compelling executive summary for {{document_type}} regarding {{subject}}.

**Document Context:**
- Document Type: {{document_type}}
- Subject: {{subject}}
- Audience: {{audience}}
- Primary Objective: {{objective}}
- Key Recommendation: {{recommendation}}

**Executive Summary Structure:**

1. **Opening Statement** (1-2 sentences)
   - Context and purpose
   - Why this matters now

2. **Situation Overview** (3-4 sentences)
   - Current state
   - Key background
   - Triggering event or catalyst

3. **Key Findings** (4-5 bullet points)
   - Most important insights
   - Critical data points
   - Supporting evidence
   - Prioritized by importance

4. **Implications** (2-3 bullet points)
   - What this means for the organization
   - Risks of inaction
   - Opportunity cost considerations

5. **Recommendation** (Clear statement)
   - Specific recommendation
   - Key rationale
   - Expected outcome

6. **Next Steps** (3-4 action items)
   - Immediate actions
   - Decision points needed
   - Timeline and owners

7. **Key Metrics/Data** (If applicable)
   - Supporting quantitative highlights
   - Comparison points
   - Target metrics

**Formatting Guidelines:**
- Total length: {{length}}
- Tone: {{tone}}
- Use bullet points for clarity
- Bold key figures and recommendations
- Include single supporting visual if helpful

Write in active voice with clear, concise language appropriate for {{audience}}.`,
        variables: [
            {
                name: 'document_type',
                default: 'Strategic Analysis',
                description: 'Type of document',
                type: 'select',
                options: [
                    'Strategic Analysis',
                    'Investment Recommendation',
                    'Market Research',
                    'Business Case',
                    'Project Proposal',
                    'Risk Assessment',
                    'Due Diligence Report'
                ]
            },
            {
                name: 'subject',
                default: '',
                description: 'Subject matter',
                type: 'text'
            },
            {
                name: 'audience',
                default: 'Executive Leadership',
                description: 'Target audience',
                type: 'select',
                options: [
                    'Executive Leadership',
                    'Board of Directors',
                    'Investment Committee',
                    'External Stakeholders',
                    'Cross-functional Team'
                ]
            },
            {
                name: 'objective',
                default: '',
                description: 'Primary objective',
                type: 'text'
            },
            {
                name: 'recommendation',
                default: '',
                description: 'Key recommendation (brief)',
                type: 'text'
            },
            {
                name: 'length',
                default: '1 page',
                description: 'Target length',
                type: 'select',
                options: [
                    'Half page',
                    '1 page',
                    '2 pages'
                ]
            },
            {
                name: 'tone',
                default: 'Professional',
                description: 'Writing tone',
                type: 'select',
                options: [
                    'Professional',
                    'Formal',
                    'Persuasive',
                    'Neutral/Analytical'
                ]
            }
        ],
        tags: [
            'executive-summary',
            'communication',
            'writing',
            'professional'
        ],
        difficulty: 'beginner',
        estimatedTime: '10 min',
        outputFormats: [
            'memo',
            'pdf'
        ],
        useCases: [
            'Report writing',
            'Proposal submission',
            'Decision support'
        ]
    }
];
const TEMPLATE_CATEGORIES = [
    {
        id: 'all',
        name: 'All Templates',
        icon: '✨',
        slug: 'all',
        color: '#d4a853'
    },
    {
        id: 'Financial Analysis',
        name: 'Financial Analysis',
        icon: '📊',
        slug: 'financial-analysis',
        color: '#d4a853'
    },
    {
        id: 'Investment Research',
        name: 'Investment Research',
        icon: '🔍',
        slug: 'investment-research',
        color: '#14b8a6'
    },
    {
        id: 'Strategy & Planning',
        name: 'Strategy & Planning',
        icon: '⚡',
        slug: 'strategy-planning',
        color: '#8b5cf6'
    },
    {
        id: 'M&A & Deal Work',
        name: 'M&A & Deal Work',
        icon: '🤝',
        slug: 'ma-deal-work',
        color: '#f97316'
    },
    {
        id: 'Professional Reporting',
        name: 'Professional Reporting',
        icon: '📑',
        slug: 'professional-reporting',
        color: '#627d98'
    }
];
function getTemplatesByCategory(categoryId) {
    if (categoryId === 'all') return PROMPT_TEMPLATES;
    return PROMPT_TEMPLATES.filter((t)=>t.category === categoryId);
}
function getTemplatesByDifficulty(difficulty) {
    return PROMPT_TEMPLATES.filter((t)=>t.difficulty === difficulty);
}
function getTemplatesByOutputFormat(format) {
    return PROMPT_TEMPLATES.filter((t)=>t.outputFormats.includes(format));
}
function searchTemplates(query) {
    const lowerQuery = query.toLowerCase();
    return PROMPT_TEMPLATES.filter((t)=>t.name.toLowerCase().includes(lowerQuery) || t.description.toLowerCase().includes(lowerQuery) || t.tags.some((tag)=>tag.toLowerCase().includes(lowerQuery)) || t.category.toLowerCase().includes(lowerQuery));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$SplashScreen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/SplashScreen.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Onboarding$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Onboarding.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Icons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PromptTemplates$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/PromptTemplates.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
// Quick start workflows for different roles
const quickStartWorkflows = [
    {
        id: 'ib',
        name: 'Investment Banking',
        icon: 'building',
        templates: [
            'dcf-valuation',
            'comparable-companies',
            'pitch-deck'
        ],
        color: '#d4a853'
    },
    {
        id: 'pe',
        name: 'Private Equity',
        icon: 'briefcase',
        templates: [
            'investment-memo',
            'due-diligence',
            'term-sheet'
        ],
        color: '#14b8a6'
    },
    {
        id: 'corp',
        name: 'Corporate Finance',
        icon: 'chart',
        templates: [
            'business-plan',
            'board-deck',
            'investor-update'
        ],
        color: '#8b5cf6'
    },
    {
        id: 'strategy',
        name: 'Strategy Consulting',
        icon: 'target',
        templates: [
            'swot-analysis',
            'competitive-intelligence',
            'tam-sam-som'
        ],
        color: '#f97316'
    }
];
// Mock recent work for demonstration
const recentWork = [
    {
        name: 'DCF - Acme Corp',
        template: 'DCF Valuation',
        time: '2 hours ago',
        status: 'completed'
    },
    {
        name: 'DD Framework - TechCo',
        template: 'Due Diligence',
        time: '5 hours ago',
        status: 'in-progress'
    },
    {
        name: 'Q4 Board Deck',
        template: 'Board Deck',
        time: '1 day ago',
        status: 'completed'
    }
];
function Home() {
    _s();
    const [showSplash, setShowSplash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showOnboarding, setShowOnboarding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const hasOnboarded = localStorage.getItem('promptforge-onboarded');
            if (!hasOnboarded) {
                setShowOnboarding(true);
            }
        }
    }["Home.useEffect"], []);
    const handleSplashComplete = ()=>{
        setShowSplash(false);
        setIsLoaded(true);
    };
    const handleOnboardingComplete = ()=>{
        setShowOnboarding(false);
    };
    const handleShowHelp = ()=>{
        localStorage.removeItem('promptforge-onboarded');
        setShowOnboarding(true);
    };
    const filteredTemplates = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PromptTemplates$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PROMPT_TEMPLATES"].filter((t)=>{
        const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
        const matchesSearch = searchQuery === '' || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            showSplash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$SplashScreen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onComplete: handleSplashComplete,
                duration: 3000
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 63,
                columnNumber: 22
            }, this),
            !showSplash && showOnboarding && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Onboarding$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onComplete: handleOnboardingComplete
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 64,
                columnNumber: 41
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: `min-h-screen transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 bg-gradient-mesh pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "relative z-10 flex items-center justify-between px-6 py-4 border-b border-[#1e3a5f]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/",
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4a853] to-[#b8953f] flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icons"].chart, {
                                                    className: "w-6 h-6 text-[#0a1929]"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 74,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl font-bold",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[#d4a853]",
                                                        children: "Prompt"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 78,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white",
                                                        children: "Forge"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 79,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 77,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 73,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden md:flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/",
                                                className: "px-4 py-2 text-white font-medium rounded-lg bg-[rgba(212,168,83,0.1)]",
                                                children: "Dashboard"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 85,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/playground",
                                                className: "px-4 py-2 text-[#94a3b8] hover:text-white transition-colors rounded-lg hover:bg-[#162a45]",
                                                children: "Builder"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 88,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "px-4 py-2 text-[#94a3b8] hover:text-white transition-colors rounded-lg hover:bg-[#162a45]",
                                                children: "Library"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 91,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "px-4 py-2 text-[#94a3b8] hover:text-white transition-colors rounded-lg hover:bg-[#162a45]",
                                                children: "Research"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 94,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 84,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleShowHelp,
                                        className: "p-2 text-[#64748b] hover:text-[#d4a853] transition-colors",
                                        title: "Show onboarding",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icons"].help, {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "p-2 text-[#64748b] hover:text-white transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icons"].settings, {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-full bg-gradient-to-br from-[#d4a853] to-[#b8953f] flex items-center justify-center text-[#0a1929] text-sm font-semibold",
                                        children: "H"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 111,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 px-6 py-8 max-w-7xl mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-3xl font-bold text-white mb-2",
                                        children: "Welcome back"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[#94a3b8]",
                                        children: "Select a template or start from scratch to create your financial analysis prompt."
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 121,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "card p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-medium text-[#94a3b8] mb-4 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icons"].chartLine, {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 129,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Quick Stats"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 128,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-2xl font-bold text-[#d4a853] tabular-nums",
                                                                children: "$0.00"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 134,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-[#64748b]",
                                                                children: "Cost MTD"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 135,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-2xl font-bold text-white tabular-nums",
                                                                children: "0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 138,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-[#64748b]",
                                                                children: "Executions"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 139,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 137,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-2xl font-bold text-[#14b8a6] tabular-nums",
                                                                children: "18"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 142,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-[#64748b]",
                                                                children: "Templates"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 143,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 141,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-2xl font-bold text-[#627d98] tabular-nums",
                                                                children: "5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 146,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-[#64748b]",
                                                                children: "Categories"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 147,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 145,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 132,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "card p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-medium text-[#94a3b8] mb-4 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icons"].history, {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 155,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Recent Work"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 154,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: recentWork.map((work, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `w-2 h-2 rounded-full ${work.status === 'completed' ? 'bg-[#059669]' : 'bg-[#d4a853]'}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 161,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 truncate",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white",
                                                                    children: work.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 163,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 162,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#64748b] text-xs",
                                                                children: work.time
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 165,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 160,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 158,
                                                columnNumber: 15
                                            }, this),
                                            recentWork.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[#64748b] text-sm",
                                                children: "No recent work yet"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 170,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 153,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "card p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-medium text-[#94a3b8] mb-4 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icons"].bolt, {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 177,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Quick Start"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 176,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-2",
                                                children: quickStartWorkflows.map((workflow)=>{
                                                    const IconComponent = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icons"][workflow.icon];
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: `/playground?template=${workflow.templates[0]}`,
                                                        className: "p-3 rounded-lg border border-[#1e3a5f] hover:border-[#2d4a6f] bg-[#0f2137] hover:bg-[#162a45] transition-all group",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-8 h-8 rounded-lg flex items-center justify-center",
                                                                    style: {
                                                                        background: `${workflow.color}20`
                                                                    },
                                                                    children: IconComponent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                                                                        className: "w-4 h-4",
                                                                        style: {
                                                                            color: workflow.color
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 194,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 190,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs text-[#94a3b8] group-hover:text-white transition-colors",
                                                                    children: workflow.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 196,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 189,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, workflow.id, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 184,
                                                        columnNumber: 21
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 180,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 175,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-xl font-bold text-white",
                                                children: "Financial Templates"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 210,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icons"].search, {
                                                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 214,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        placeholder: "Search templates...",
                                                        value: searchQuery,
                                                        onChange: (e)=>setSearchQuery(e.target.value),
                                                        className: "pl-10 pr-4 py-2 bg-[#0a1929] border border-[#1e3a5f] rounded-lg text-sm text-white placeholder-[#64748b] focus:border-[#d4a853] focus:outline-none w-64"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 215,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 213,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 209,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 mb-6 overflow-x-auto pb-2",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PromptTemplates$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEMPLATE_CATEGORIES"].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setActiveCategory(cat.id),
                                                className: `px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${activeCategory === cat.id ? 'bg-[rgba(212,168,83,0.15)] text-[#d4a853] border border-[rgba(212,168,83,0.3)]' : 'text-[#94a3b8] hover:text-white hover:bg-[#162a45]'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mr-2",
                                                        children: cat.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 237,
                                                        columnNumber: 19
                                                    }, this),
                                                    cat.name
                                                ]
                                            }, cat.id, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 228,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 226,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                                        children: filteredTemplates.slice(0, 9).map((template)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/playground?template=${template.id}`,
                                                className: "group p-5 rounded-xl border border-[#1e3a5f] bg-[#0f2137] hover:border-[#d4a853] hover:bg-[#162a45] transition-all",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4a853] to-[#b8953f] flex items-center justify-center text-2xl shrink-0",
                                                            children: template.icon
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 252,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1 min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "font-semibold text-white group-hover:text-[#d4a853] transition-colors truncate",
                                                                    children: template.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 256,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-[#64748b] line-clamp-2 mt-1",
                                                                    children: template.description
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 259,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2 mt-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: `badge badge-${template.difficulty}`,
                                                                            children: template.difficulty
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 263,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-[#64748b]",
                                                                            children: template.estimatedTime
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 266,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        template.outputFormats.includes('excel') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "badge badge-excel text-xs",
                                                                            children: "Excel"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 268,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        template.outputFormats.includes('powerpoint') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "badge badge-powerpoint text-xs",
                                                                            children: "PPT"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 271,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 262,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 255,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 19
                                                }, this)
                                            }, template.id, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 246,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 244,
                                        columnNumber: 13
                                    }, this),
                                    filteredTemplates.length > 9 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center mt-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/playground",
                                            className: "btn-secondary inline-flex items-center gap-2",
                                            children: [
                                                "View all ",
                                                filteredTemplates.length,
                                                " templates",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icons"].arrowRight, {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 288,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 283,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 282,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 card card-gold p-8 bg-gradient-navy-gold",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col md:flex-row items-center justify-between gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-2xl font-bold text-white mb-2",
                                                    children: "Ready to build?"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 298,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[#94a3b8]",
                                                    children: "Create custom prompts or use our expert-crafted templates."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 299,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 297,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/playground",
                                                    className: "btn-primary",
                                                    children: [
                                                        "Open Builder",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icons"].arrowRight, {
                                                            className: "w-4 h-4 ml-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 304,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/playground?mode=expert",
                                                    className: "btn-secondary",
                                                    children: "Expert Mode"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 308,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 303,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 296,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 295,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "relative z-10 px-6 py-8 border-t border-[#1e3a5f] mt-12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-[#64748b]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[#d4a853] font-semibold",
                                            children: "PromptForge"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 320,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "•"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 321,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "AI-Powered Financial Analysis"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 322,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 319,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[#64748b] text-sm",
                                            children: "v2.0.0"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 325,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://github.com",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "text-[#64748b] hover:text-white transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icons"].github, {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 332,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 326,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 324,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 318,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 317,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Home, "eCC/JzgoDjWIQSf+RGfEuHQZZjU=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_6f70b26b._.js.map