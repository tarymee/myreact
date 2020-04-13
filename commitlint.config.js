module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-enum': [
            2,
            'always',
            [
                '自测',
                '旗舰版',
                '企业版'
            ]
        ],
        'type-enum': [
            2,
            'always',
            [
                'build',
                'chore',
                'ci',
                'docs',
                'feat',
                'fix',
                'improvement',
                'perf',
                'refactor',
                'revert',
                'style',
                'test'
            ]
        ]
    }
};