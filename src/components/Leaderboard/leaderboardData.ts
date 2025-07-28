/**
 * 榜单数据管理
 * 负责处理榜单数据，直接使用内嵌数据而不是JSON文件导入
 */
import { LeaderboardEntry, TimePeriodType, LeaderboardData } from '../../types';

const mockLeaderboardData: LeaderboardData = {
  "weekly": {
    "2025-06-W1": [
      {
        "modelName": "GPT-4-Turbo",
        "agentFramework": "AutoGPT",
        "overallScore": 85.5,
        "numberOfEvents": 1200,
        "level1Score": 90,
        "level2Score": 88,
        "level3Score": 82,
        "level4Score": 80
      },
      {
        "modelName": "Claude-3-Opus",
        "agentFramework": "LangChain",
        "overallScore": 83.2,
        "numberOfEvents": 1150,
        "level1Score": 88,
        "level2Score": 85,
        "level3Score": 80,
        "level4Score": 79
      },
      {
        "modelName": "Gemini-1.5-Pro",
        "agentFramework": "CrewAI",
        "overallScore": 81.7,
        "numberOfEvents": 1080,
        "level1Score": 86,
        "level2Score": 83,
        "level3Score": 78,
        "level4Score": 77
      },
      {
        "modelName": "GPT-3.5-Turbo",
        "agentFramework": "AutoGPT",
        "overallScore": 75.3,
        "numberOfEvents": 950,
        "level1Score": 82,
        "level2Score": 78,
        "level3Score": 72,
        "level4Score": 69
      }
    ],
    "2025-06-W2": [
      {
        "modelName": "GPT-4-Turbo",
        "agentFramework": "AutoGPT",
        "overallScore": 86.1,
        "numberOfEvents": 1250,
        "level1Score": 91,
        "level2Score": 89,
        "level3Score": 83,
        "level4Score": 81
      },
      {
        "modelName": "Claude-3-Opus",
        "agentFramework": "LangChain",
        "overallScore": 84.0,
        "numberOfEvents": 1180,
        "level1Score": 89,
        "level2Score": 86,
        "level3Score": 81,
        "level4Score": 80
      },
      {
        "modelName": "Gemini-1.5-Pro",
        "agentFramework": "CrewAI",
        "overallScore": 82.5,
        "numberOfEvents": 1120,
        "level1Score": 87,
        "level2Score": 84,
        "level3Score": 79,
        "level4Score": 78
      }
    ],
    "2025-06-W3": [
      {
        "modelName": "GPT-4-Turbo",
        "agentFramework": "AutoGPT",
        "overallScore": 86.8,
        "numberOfEvents": 1300,
        "level1Score": 92,
        "level2Score": 89,
        "level3Score": 84,
        "level4Score": 82
      },
      {
        "modelName": "Claude-3.Sonnet",
        "agentFramework": "LangChain",
        "overallScore": 84.2,
        "numberOfEvents": 1220,
        "level1Score": 89,
        "level2Score": 86,
        "level3Score": 82,
        "level4Score": 80
      }
    ],
    "2025-06-W4": [
      {
        "modelName": "Claude-3-Opus",
        "agentFramework": "LangChain",
        "overallScore": 84.5,
        "numberOfEvents": 1200,
        "level1Score": 90,
        "level2Score": 87,
        "level3Score": 82,
        "level4Score": 80
      },
      {
        "modelName": "GPT-4-Turbo",
        "agentFramework": "CrewAI",
        "overallScore": 87.1,
        "numberOfEvents": 1280,
        "level1Score": 92,
        "level2Score": 90,
        "level3Score": 84,
        "level4Score": 82
      }
    ]
  },
  "monthly": {
    "2025-07": [
      {
        "modelName": "GPT-4-Turbo",
        "agentFramework": "AutoGPT",
        "overallScore": 85.8,
        "numberOfEvents": 4950,
        "level1Score": 90,
        "level2Score": 88,
        "level3Score": 82,
        "level4Score": 80
      },
      {
        "modelName": "Claude-3-Opus",
        "agentFramework": "LangChain",
        "overallScore": 83.6,
        "numberOfEvents": 4650,
        "level1Score": 88,
        "level2Score": 85,
        "level3Score": 80,
        "level4Score": 79
      },
      {
        "modelName": "Gemini-1.5-Pro",
        "agentFramework": "CrewAI",
        "overallScore": 82.1,
        "numberOfEvents": 4320,
        "level1Score": 86,
        "level2Score": 83,
        "level3Score": 78,
        "level4Score": 77
      }
    ],
    "2025-08": [
      {
        "modelName": "GPT-4-Turbo",
        "agentFramework": "AutoGPT",
        "overallScore": 87.2,
        "numberOfEvents": 5200,
        "level1Score": 92,
        "level2Score": 90,
        "level3Score": 84,
        "level4Score": 82
      },
      {
        "modelName": "Claude-3-Opus",
        "agentFramework": "LangChain",
        "overallScore": 85.1,
        "numberOfEvents": 4950,
        "level1Score": 90,
        "level2Score": 87,
        "level3Score": 82,
        "level4Score": 81
      },
      {
        "modelName": "Gemini-1.5-Pro",
        "agentFramework": "CrewAI",
        "overallScore": 83.8,
        "numberOfEvents": 4680,
        "level1Score": 88,
        "level2Score": 85,
        "level3Score": 81,
        "level4Score": 79
      }
    ],
    "2025-09": [
      {
        "modelName": "GPT-4-Turbo",
        "agentFramework": "AutoGPT",
        "overallScore": 88.1,
        "numberOfEvents": 5400,
        "level1Score": 93,
        "level2Score": 91,
        "level3Score": 85,
        "level4Score": 83
      },
      {
        "modelName": "Claude-3-Opus",
        "agentFramework": "LangChain",
        "overallScore": 86.0,
        "numberOfEvents": 5100,
        "level1Score": 91,
        "level2Score": 88,
        "level3Score": 84,
        "level4Score": 82
      }
    ]
  }
};

export const useLeaderboardData = () => {
  const getLeaderboardData = (
    timePeriodType: TimePeriodType,
    selectedTime: string
  ): LeaderboardEntry[] => {
    const data = mockLeaderboardData[timePeriodType]?.[selectedTime];
    
    if (!data) {
      return [];
    }
    
    // 按 Overall Score 降序排序
    return [...data].sort((a, b) => b.overallScore - a.overallScore);
  };

  return {
    getLeaderboardData
  };
};