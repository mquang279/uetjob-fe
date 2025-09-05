export const mapCandidateLevel = (candidateLevel) => {
    const candidateLevelMap = {
        'NHAN_VIEN': 'Nhân viên',
        'NHOM_TRUONG': 'Trưởng nhóm',
        'TRUONG_PHONG': 'Trưởng phòng',
        'PHO_GIAM_DOC': 'Phó Giám đốc',
        'GIAM_DOC': 'Giám đốc',
        'OTHER': 'Khác'
    };

    return candidateLevelMap[candidateLevel] || candidateLevel;
};

export const mapJobType = (jobType) => {
    const jobTypeMap = {
        'FULL_TIME': 'Toàn thời gian',
        'PART_TIME': 'Bán thời gian'
    };

    return jobTypeMap[jobType] || jobType;
};

export const mapJobLevel = (jobLevel) => {
    const jobLevelMap = {
        'INTERN': 'Thực tập sinh',
        'FRESHER': 'Nhân viên mới',
        'JUNIOR': 'Nhân viên',
        'MIDDLE': 'Nhân viên trung cấp',
        'SENIOR': 'Nhân viên cao cấp',
        'LEAD': 'Trưởng nhóm',
        'OTHER': 'Khác'
    };

    return jobLevelMap[jobLevel] || jobLevel;
};
